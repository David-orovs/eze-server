import * as factory from '../utils/controllerFactory';
import Request from '../models/Request';
import requests from '../seeds/requests';
import catchAsync from '../utils/catchAsync';
import { NotFoundError } from '../utils/errors';

export const getAll = factory.getAll(Request);

export const create = async (req, res, next) => {
  req.body = requests;
  await Request.deleteMany({});
  return factory.create(Request)(req, res, next);
};

export const getAllStorageSizes = factory.getAllUnique(Request, 'storageSize');

export const getMinMaxPrices = catchAsync(async (req, res, next) => {
  const [minmax] = await Request.aggregate([
    { $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' } } },
  ]);

  if (minmax) {
    const { min, max } = minmax;

    res.status(200).json({
      status: 'success',
      prices: { min, max },
    });
  } else {
    throw new NotFoundError('No requests found');
  }
});

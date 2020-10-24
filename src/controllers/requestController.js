import * as factory from '../utils/controllerFactory';
import Request from '../models/Request';
import requests from '../seeds/requests';

export const getAll = factory.getAll(Request);

export const create = async (req, res, next) => {
  req.body = requests;
  await Request.deleteMany({});
  return factory.create(Request)(req, res, next);
};

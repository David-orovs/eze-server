import { singular, plural } from 'pluralize';

import { NotFoundError } from './errors';
import catchAsync from './catchAsync';
import APIExtension from './apiExtension';

export function create(Model) {
  return catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    const { collectionName } = Model.collection;

    res.status(201).json({
      status: 'success',
      message: Array.isArray(newDoc)
        ? `${newDoc.length} ${collectionName} created`
        : undefined,
      [singular(collectionName)]: !Array.isArray(newDoc) ? newDoc : undefined,
    });
  });
}

export function getAll(Model, customCollectionName) {
  return catchAsync(async (req, res, next) => {
    const api = new APIExtension(Model, req.query);
    const { collectionName } = Model.collection;
    const [docs, totalCount] = await Promise.all([
      api.query,
      Model.find(...api.filterOptions).count(),
    ]);

    res.status(200).json({
      status: 'success',
      totalCount,
      [customCollectionName || collectionName]: docs,
    });
  });
}

export function getAllUnique(Model, identifier, customPropertyName) {
  return catchAsync(async (req, res, _next) => {
    const api = new APIExtension(Model, req.query);
    const docs = await Model.find(...api.filterOptions).distinct(identifier);

    res.status(200).json({
      status: 'success',
      [customPropertyName || plural(identifier)]: docs,
    });
  });
}

export function getOne(Model, populateOptions) {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;
    const { collectionName } = Model.collection;

    if (!doc) throw new NotFoundError('Cannot find document with that ID.');

    res.status(200).json({
      status: 'success',
      [singular(collectionName)]: doc,
    });
  });
}

export function updateOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const { collectionName } = Model.collection;

    if (!doc) throw new NotFoundError('Cannot find document with that ID.');

    res.status(200).json({
      status: 'success',
      [singular(collectionName)]: doc,
    });
  });
}

export function deleteOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) throw new NotFoundError('Cannot find document with that ID.');

    res.status(204).end();
  });
}

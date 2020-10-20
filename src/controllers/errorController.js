export const notFoundError = (req, res, next) => {
  res.status(404).json({
    status: 'NOT_FOUND',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
};

export const serverError = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  if (!err.status) console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'ERROR',
    message: err.message || 'Internal Server Error',
  });
};

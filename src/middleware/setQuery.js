export default (queryObject = {}) => (req, res, next) => {
  req.query = { ...req.query, ...queryObject };
  next();
};

export default (obj, fields, options = { exclude: false }) => {
  if (!options.exclude)
    return Object.keys(obj).reduce((acc, el) => {
      if (fields.includes(el)) {
        acc[el] = obj[el];
      }
      return acc;
    }, {});

  const queryObj = { ...obj };
  fields.forEach((el) => delete queryObj[el]);
  return queryObj;
};

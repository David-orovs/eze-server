import filterObject from './filterObject';

class APIExtension {
  constructor(query, queryObject) {
    this.query = query;
    this.queryObject = queryObject;

    this.filter().sort().paginate();
  }

  filter() {
    const queryObj = filterObject(
      this.queryObject,
      ['page', 'sort', 'limit', 'fields'],
      { exclude: true }
    );

    const search = {};
    if (queryObj.q) {
      search.$text = { $search: queryObj.q };
      delete queryObj.q;
    }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(eq|gte|gt|lte|lt|ne|exists)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find({ ...JSON.parse(queryStr), ...search });

    return this;
  }

  sort() {
    if (this.queryObject.sort) {
      const sortBy = this.queryObject.sort.replace(/,/g, ' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  paginate() {
    const page = +this.queryObject.page || 1;
    const limit = +this.queryObject.limit || 20;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIExtension;

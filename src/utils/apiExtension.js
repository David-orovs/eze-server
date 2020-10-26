import filterObject from './filterObject';

class APIExtension {
  constructor(query, queryObject) {
    this.query = query;
    this.queryObject = queryObject;
    this.filterOptions = [];

    this.filter().sort().limitFields().paginate();
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
    }
    delete queryObj.q;

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(eq|gte|gt|lte|lt|ne|exists)\b/g,
      (match) => `$${match}`
    );

    this.filterOptions.push(
      { ...JSON.parse(queryStr), ...search },
      { score: { $meta: 'textScore' } }
    );

    this.query = this.query.find(...this.filterOptions);

    return this;
  }

  sort() {
    if (this.queryObject.sort) {
      const sortBy = this.queryObject.sort.replace(/,/g, ' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort({ score: { $meta: 'textScore' } });
    }

    return this;
  }

  limitFields() {
    if (this.queryObject.fields) {
      const fields = this.queryObject.fields.replace(/,/g, ' ');
      this.query = this.query.select(fields);
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

/* eslint-disable max-classes-per-file */
class HttpError extends Error {
  constructor(message = 'Internal Server Error') {
    super(message);
    this.status = 500;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(message);
    this.status = 400;
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(message);
    this.status = 404;
  }
}

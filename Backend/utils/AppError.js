export class AppError extends Error {
    constructor(message, statusCode = 500) {
      super(message);
      this.stack = this.stack;
      this.name = this.name;
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
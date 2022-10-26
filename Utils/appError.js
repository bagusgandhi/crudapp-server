class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      if (this.statusCode === 404) this.status = 'Not Found';
      if (this.statusCode === 400) this.status = 'Bad Request';
      if (this.statusCode === 500) this.status = 'Internal Server Error';
    }
  }
  
module.exports = AppError;

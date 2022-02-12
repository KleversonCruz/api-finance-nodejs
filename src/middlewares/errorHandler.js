const { InvalidArgumentError, NotFoundError } = require('../errors');
const ConflictError = require('../errors/ConflictError');

module.exports = (error, req, res, next) => {
  let status = 500;

  if (error instanceof InvalidArgumentError) {
    status = 400;
  }

  if (error instanceof NotFoundError) {
    status = 404;
  }

  if (error instanceof ConflictError) {
    status = 409;
  }

  res.status(status).json({
    status,
    error: error.name,
    message: error.message,
  });
  next();
};

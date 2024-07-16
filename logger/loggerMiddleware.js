// loggerMiddleware.js
const logger = require('./logger');

const loggerMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = loggerMiddleware;

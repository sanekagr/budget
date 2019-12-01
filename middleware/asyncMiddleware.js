/*  asynchronous function middleware - use it in all async functions in route (that uses DB for example)*/

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

  module.exports = asyncMiddleware
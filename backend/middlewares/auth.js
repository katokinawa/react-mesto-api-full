const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(new Unauthorized('Необходима авторизация.'));
  }
  let payload;
  try {
    payload = jwt.verify(
      req.cookies.jwt,
      `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`,
    );
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация.'));
  }

  req.user = payload;
  return next();
};

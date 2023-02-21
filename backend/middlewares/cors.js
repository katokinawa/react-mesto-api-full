const router = require('express').Router();

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://katokinawa.front.nomoredomainsclub.ru',
  'http://katokinawa.front.nomoredomainsclub.ru',
  'https://localhost:3000',
  'http://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3001',
];

router.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    // res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

module.exports = router;

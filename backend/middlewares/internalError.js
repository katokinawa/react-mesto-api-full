const router = require('express').Router();

router.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? 'Что-то пошло не так...' : message,
  });
  next();
});

module.exports = router;

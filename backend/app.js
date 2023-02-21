require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const internalError = require('./middlewares/internalError');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Connected!')); // обычная проверочка подключения к базе данных.

app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(requestLogger);
app.use(routes);
app.use(errorLogger); // логгер ошибок
app.use(internalError); // ошибка сервера
app.use(cors); // кросс-доменные запросы
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

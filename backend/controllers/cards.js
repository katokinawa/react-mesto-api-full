const Card = require('../models/card');

const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

module.exports.getCards = (req, res, next) => {
  // Получить массив всех карточек
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  // Создать карточку
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequest('Переданы некорректные данные при создании карточки.'),
        );
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  // Удалить карточку
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка с указанным _id не найдена.'));
      } else if (String(card.owner) !== req.user._id) {
        next(new Forbidden('Вы не можете удалять чужие карточки'));
      } else {
        card.remove().then(() => res.status(200).send({ data: card })).catch(next);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound('Передан несуществующий _id карточки.'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequest(
            'Переданы некорректные данные для постановки/снятии лайка.',
          ),
        );
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return next(new NotFound('Передан несуществующий _id карточки.'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequest(
            'Переданы некорректные данные для постановки/снятии лайка.',
          ),
        );
      }
      return next(err);
    });
};

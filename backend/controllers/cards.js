const Card = require("../models/card");
const {handleErrors} = require("../utils/utils");

const getAllCards = (req, res, next) => {
  Card.find({}).then((cards) => {
    res.send({
      status: true,
      data: cards,
    });
  });
};

const getCard = (req, res) => {
  const id = req.params.id;
  Card.findById(id).orFail().then(card => {
    res.send(card);
  }).catch(error => handleErrors(error, res));
}

const storeCard = (req, res) => {
  const { name, link } = req.body;

  console.log(req.user);

  Card.create({ name, link, owner: req.user })
    .then((card) => res.send({ card }))
    .catch(error => handleErrors(error, res))
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  ).then(card => {
    res.send(card);
  }).catch(error => handleErrors(error, res))
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).then(card => {
    res.send(card);
  }).catch(error => handleErrors(error, res))
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(
    req.card.owner._id === user._id,
    { $pull: { delete: req.card.owner._id } },
    { new: true }
  ).orFail().then(() => {
    res.send({status: true})
  }).catch(error => handleErrors(error, res));
};

module.exports = { getAllCards, storeCard, likeCard, dislikeCard, deleteCard, getCard };

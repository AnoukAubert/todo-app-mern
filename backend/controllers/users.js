const User = require("../models/user");
const bcrypt = require('bcryptjs');
const {handleErrors} = require("../utils/utils");
const jwt = require('jsonwebtoken');

const getAllUsers = (request, response) => {
  User.find({}).then((users) => {
    response.send({
      status: true,
      data: users
    })
  }).then(card => {
    res.send(card);
  }).catch(error => handleErrors(error, res));
};

const getUser = (req, res) => {
  User.findById(request.params.id).orFail().then((user) => {
    response.send({
      status: true,
      data: user
    })
  }).catch(error => handleErrors(error, res));
};

const createUser = (req, res) => {      //acá revisar
  const { name, about, avatar, password, email } = req.body; //me lo marca en desuso 'password'
  bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({ name, about, avatar, password : hash, email })
    .then((user) => res.send({ data: user }))
    .catch(error => handleErrors(error, res))
    )
};

const me = (req, res) => {
  const id = req.user._id;
  User.findById(id).then(user => {
    res.send(user);
  }).then(card => {
    res.send(card);
  }).catch(error => handleErrors(error, res));
};

const updateUser = (req, res) => {
  const id = req.user._id;
  const {about, name} = req.body;
  User.findByIdAndUpdate(id, {about, name}, { new: true }).then(user => {
    res.send(user);
  }).then(card => {
    res.send(card);
  }).catch(error => handleErrors(error, res));
};

const updateAvatar = (req, res) => {
  const id = req.user._id;
  const {avatar} = req.body;
  User.findByIdAndUpdate(id, {avatar}, { new: true }).then(user => {
    res.send(user);
  }).then(card => {
    res.send(card);
  }).catch(error => handleErrors(error, res));
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Incorrect password or email'));
      }

      const token = jwt.sign({ _id: user._id }, 'some-secret-key');

      res.send({ status: true, token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {getAllUsers, me, updateAvatar, updateUser, getUser, createUser, login}
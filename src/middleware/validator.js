const validator = require('validator');
const { user } = require('../models');
const bcrypt = require("bcrypt")

const regisValidator = async (req, res, next) => {
  const { firstname, username, email, password } = req.body;

  if (!firstname || !username || !email || !password) {
    return res.status(400).send({
      message: 'Register failed, field must not empty',
    });
  }

  const isValidEmail = validator.isEmail(email, {
    host_whitelist: ['gmail.com'],
  });
  if (!isValidEmail) {
    return res.status(400).send({
      message: 'invalid email, use only gmail.com',
    });
  }

  const isValidPassword = validator.isStrongPassword(password);
  if (!isValidPassword) {
    return res.status(400).send({
      message:
        'password not strong enough , password must be 8 character, include lowercase, uppercase, number, and symbol',
    });
  }

  next();
};

const loginValidator = async (req, res, next) => {
  const { username, password } = req.body;

  const getUser = await user.findOne({ where: { username: username } });

  if (!getUser) {
    return res.status(400).send({
      message: 'Error , user not found',
    });
  }

  const dataUser = getUser.dataValues

  const comparePassword = bcrypt.compareSync(
    password,
    dataUser.password
  );

  if (!comparePassword) {
    return res.status(400).send({
      message: 'Error , incorrect password',
    });
  }

  req.userInfo = dataUser

  next()
};

module.exports = { regisValidator, loginValidator };

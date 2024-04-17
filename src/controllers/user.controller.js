const knex = require('../knexmodels/knex');
const bcrypt = require('bcrypt');
const { user } = require('../models');
const { where } = require('sequelize');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  // const regis = await knex('users').insert({
  //   firstname: firstname,
  //   lastname: lastname,
  //   username: username,
  //   email: email,
  //   password: password,
  // });

  const hashPassword = bcrypt.hashSync(password, 8);
  console.log(password, hashPassword);

  const regis = await user.create({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    password: hashPassword,
  });

  return res.status(201).send({
    message: 'Create user succes',
  });
};

const allUsers = async (req, res) => {
  const all = await knex.select().from('users');

  return res.status(200).send({
    message: 'All user data retrieved',
    data: all,
  });
};

const login = async (req, res) => {
  const data = req.userInfo;

  const token = jwt.sign(
    { id: data.id, username: data.username },
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  );
  console.log(token);

  return res.status(200).send({
    message: 'login successfully ',
    data: token,
  });
};

const uploadprofile = async (req, res, next) => {
  const userData = req.user;
  const file = req.file;
  // console.log(user)
  // console.log(file)

  const updateProfileField = await user.update(
    { picture: file.path },
    { where: { id: userData.id } }
  );
  return res.status(201).send({
    message: 'upload successfully',
  });
};

module.exports = { register, allUsers, login, uploadprofile };

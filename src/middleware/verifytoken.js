const jwt = require('jsonwebtoken');
const { user } = require('../models');
const { response } = require('express');

const verify = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).send({
        message: 'No token provided',
      });
    }

    const checkToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    if (!checkToken) {
      return res.status(403).send({
        message: 'Failed to authenticate jwt',
      });
    }

    req.user = checkToken

    next();
  } catch (error) {
    return res.status(403).send({
        message: error
    })
  }
};

module.exports = { verify };

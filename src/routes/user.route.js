const express = require('express');
const { register, allUsers, login, uploadprofile } = require('../controllers/user.controller');
const { verify } = require('../middleware/verifytoken');
const { regisValidator, loginValidator } = require('../middleware/validator');
const { uploadProfilePic } = require('../middleware/upload');

const router = express.Router();

router.post('/register', regisValidator, register);
router.get('/all', verify, allUsers);
router.post('/login', loginValidator, login);
router.post('/uploadprofile', verify, uploadProfilePic.single('file'), uploadprofile);

module.exports = router;

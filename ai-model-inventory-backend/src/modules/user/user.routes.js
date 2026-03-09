const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router.post('/users', controller.createUser);
router.get('/getuser', controller.getCurrentUser);
router.patch('/updateprofile', controller.updateProfile);

module.exports = router;
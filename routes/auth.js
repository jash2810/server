var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.post('/register', handle.registerUser)
router.post('/login', handle.loginUser)
router.get('/test', handle.verifyToken)

module.exports = router
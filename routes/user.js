var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.get('/:userId', handle.getUser)
router.get('/getUserWithFavouriteFood/:uid', handle.getUserWithFavouriteFood)
router.post('/update/:userId', handle.updateUser)


module.exports = router
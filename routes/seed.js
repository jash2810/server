var express = require('express');
var router = express.Router();
var handle = require('../handlers')
 
/* GET home page. */
router.get('/', function(req, res, next) {
 res.send('done')
});
 
router.get('/cusine', handle.seedCusine)
router.get('/ingredient', handle.seedIngredient)
router.get('/user', handle.seedUser)
router.get('/food', handle.seedFood)

// timepass
router.get('/seefood', handle.seeFood)
 
module.exports = router;

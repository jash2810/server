var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.post('/make', handle.authUser, handle.makeFood)
router.get('/cusines', handle.getCusines)
router.get('/ingredients', handle.getIngredients)
router.post('/insert/:uid', handle.insertFood)
router.get('/:uid', handle.getUserFoods)
router.get('/:uid/:fid', handle.getUserFood)
router.post('/delete', handle.deleteFood)
router.get('/', handle.getAllFoodForTimeline)
router.get('/like/:fid/:uid', handle.likeFood)

module.exports = router
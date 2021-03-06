var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.post('/make', handle.authUser, handle.makeFood)
router.get('/cusines', handle.getCusines)
router.get('/ingredients', handle.getIngredients)
router.post('/insert/:uid', handle.insertFood)
router.get('/getFoodFromTimeline/:fid', handle.getFoodFromTimeline)
router.get('/:uid', handle.getUserFoods)
router.get('/:uid/:fid', handle.getUserFood)
router.post('/delete', handle.deleteFood)
router.get('/getSingleFood/:fid', handle.getSingleFood)
router.get('/', handle.getAllFoodForTimeline)
router.get('/like/:fid/:uid', handle.likeFood)
router.get('/dislike/:fid/:uid', handle.dislikeFood)
router.get('/addToFav/:fid/:uid', handle.addToFav)
router.get('/removeFromFav/:fid/:uid', handle.removeFromFav)

module.exports = router
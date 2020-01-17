const db = require('../models')
const mongoose = require('mongoose')

exports.makeFood = async (req, res, next) => {
    try {
        
        const newFood = new db.Food(req.body)

        await newFood.save()

        res.json(newFood)        

    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

exports.getCusines = async (req, res, next) => {
    try {
        const cusines = await db.Cusine.find()

        res.json({success: true, msg: 'Cusines found', cusines})
    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

exports.getIngredients = async (req, res, next) => {
    try {
        const ingredients = await db.Ingredient.find()

        res.json({success: true, msg: 'Ingredients found', ingredients})
    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

exports.insertFood = async (req, res, next) => {
    try{

        const newFood = new db.Food(req.body)

        await newFood.save()

        var userId = req.params.uid

        const user = await db.User.findById(userId)

        if (user) {
            user.food.push(newFood._id)
            
            await user.save()
            res.json({success: true, msg: 'done', user, newFood})
        } else {
            res.json({success: false, msg: 'user not found'})
        }
        
    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

exports.getUserFoods = async (req, res, next) => {
    try {
        const userId = req.params.uid
        const foods = await db.Food.find({
            user: userId
        }).populate('user')
        
        res.json({foods, success: true, msg: 'foods found'})
    } catch (err) {
        err.status = 400
        console.log(err);
    }
}

exports.getUserFood = async (req, res, next) => {
    try {
        const userId = req.params.uid
        const foodId = req.params.fid

        const food = await db.Food.findOne({
            user: userId,
            _id: foodId
        }).populate('user').populate('cusine').populate('ingredients.ing')

        res.json({food, success: true, msg: 'food found'})
    } catch (err) {
        err.status = 400
        console.log(err);    
    }
}

exports.getFoodFromTimeline = async (req, res, next) =>{
    try {
        const foodId = req.params.fid

        const food = await db.Food.findById(foodId).populate('user')

        res.json({food, success: true, msg: 'food from timeline fetched.'})
    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

exports.deleteFood = async (req, res, next) => {
    try {
        const {userId, foodId} = req.body

        const user = await db.User.findById(userId)

        if (user) {
            user.food.pull(foodId)
            await user.save()

            await db.Food.findByIdAndDelete(foodId)            

            res.json({success: true, msg: 'done'})
        } else {
            res.json({success: false, msg: 'failed'})
        }
    } catch (err) {
        err.status = 400
        console.log(err);
    }
}

exports.getAllFoodForTimeline = async (req, res, next) => {
    try {
        const foods = await db.Food.find().populate('cusine').populate('user')
        res.json({foods, success: true, msg: "all food for timeline"})
    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

exports.likeFood = async (req, res, next) => {
    try {
        const foodId = req.params.fid
        const userId = req.params.uid

        var food = await db.Food.findById(foodId)
        var user = await db.User.findById(userId)

        if (food && user) {
            food.likes.push(userId)
            user.likedFood.push(foodId)

            await food.save()
            await user.save()

            res.json({success: true, msg: 'you liked '+food.name})
        } else {
            res.json({success: false, msg: 'like activity failed.'})
        }
    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

exports.dislikeFood = async (req, res, next) => {
    try {
        const foodId = req.params.fid
        const userId = req.params.uid

        var food = await db.Food.findById(foodId)
        var user = await db.User.findById(userId)

        if (food && user) {
            food.likes.pull(userId)
            user.likedFood.pull(foodId)

            await food.save()
            await user.save()
            
            res.json({success: true, msg: 'you disliked '+food.name})
        } else {
            res.json({success: false, msg: 'dislike activity failed.'})
        }
    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

exports.addToFav = async (req, res, next) => {
    try {
        const foodId = req.params.fid
        const userId = req.params.uid

        var user = await db.User.findById(userId)

        if (user) {
            await user.favourites.push({food: foodId})

            await user.save()

            res.json({success: true, msg: 'added to favourite'})
        } else {
            res.json({success: false, msg: 'user not found'})
        }
    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

exports.removeFromFav = async (req, res, next) => {
    try {
        const foodId = req.params.fid
        const userId = req.params.uid

        // var user = await db.User.findById(userId)
        // console.log(user)
        // if (user) {
            await db.User.findOneAndUpdate({
                _id: userId
            }, {
                $pull: {
                    favourites: {
                        food: foodId
                    }
                }
            }, {
                upsert: true
            })

            // await user.save()

            res.json({success: true, msg: 'removed from favourite'})
        // } else {
        //     res.json({success: false, msg: 'user not found'})
        // }
    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

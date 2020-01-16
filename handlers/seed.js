const db = require('../models')
const cusineSeeds = require('../seeds/cusine')
const ingredientSeeds = require('../seeds/ingredient')
const userSeeds = require('../seeds/user')
const foodSeeds = require('../seeds/food')

exports.seedCusine = async (req, res, next) => {
    try {
        // console.log(cusineSeeds.length)
 
        for (let i = 0; i < cusineSeeds.length; i++) {
            const e = cusineSeeds[i];
            var newCusine = new db.Cusine(e)
        
            await newCusine.save((err, done) => {
                if (err) {
                    throw err
                }
            })
        }
        res.send('done')
    } catch (error) {
        error.status = 400
        console.log(error)
    }
}

exports.seedIngredient = async (req, res, next) => {
    try {
        for (let i = 0; i < ingredientSeeds.length; i++) {
            const e = ingredientSeeds[i];
            var newIngredient = new db.Ingredient(e)

            await newIngredient.save((err, done) => {
                if (err) {
                    throw err
                }
            })
        }
        res.send('done')
    } catch (error) {
        error.status = 400
        console.log(error)
    }
}

exports.seedUser = async (req, res, next) => {
    try {
        for (let i = 0; i < userSeeds.length; i++) {
            const e = userSeeds[i];
            var newUser = new db.User(e)

            await newUser.save((err, done) => {
                if (err) {
                    throw err
                }                
            })
        }
        res.send('done')
    } catch (error) {
        error.status = 400
        console.log(error)
    }
}

exports.seedFood = async (req, res, next) => {
    try {
        for (let i = 0; i < foodSeeds.length; i++) {
            const e = foodSeeds[i];
            var newFood = new db.Food(e)

            await newFood.save((err, done) => {
                if (err) {
                    throw err
                }                
            })
            console.log(newFood.user+'...........')
            var user = await db.User.findById(newFood.user)
            console.log(user)
            user.food.push(newFood._id)
            // user.food.push(newFood._id)
            user.favourites.push({food: newFood._id})
            // user.feedback.ratings.push({food: newFood._id})  
            
            await user.save((err, done1) => {
                if (err) {
                    throw err
                }
            })
        }
        res.send('done')
    } catch (error) {
        error.status = 400
        console.log(error)
    }
}

// timepass
exports.seeFood = async (req, res, next) => {
    try {
        const foods = await db.Food.find({}, {_id: 0, user: 1, name: 1, cusine: 1}).populate('user').populate('cusine')
        res.json(foods)
    } catch (error) {
        error.status = 400
        console.log(error)
    }
}
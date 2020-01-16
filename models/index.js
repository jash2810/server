const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/comfycook')

module.exports.Ingredient = require('./ingredient')
module.exports.Food = require('./food')
module.exports.Cusine = require('./cusine')
module.exports.User = require('./user')
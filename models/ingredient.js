const mongoose = require('mongoose')
 
const IngredientsSchema = new mongoose.Schema({
   name: {type: String, required: true, unique: true},
   category: {type: String, required: false} //vegetable, spice, fruite
}, {
    timestamps: true
})
 
module.exports = mongoose.model('Ingredient', IngredientsSchema)
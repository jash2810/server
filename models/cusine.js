const mongoose = require('mongoose')
 
const CusineSchema = new mongoose.Schema({
   name: {type: String, required: true, unique: true}
}, {
    timestamps: true
})
 
module.exports = mongoose.model('Cusine', CusineSchema)
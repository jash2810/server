const mongoose = require('mongoose')
 
const FoodSchema = new mongoose.Schema({
   name: String,
   category: {
       veg: {type: Boolean, default: false},
       nonVeg: {type: Boolean, default: false},
       special: {
           jain: {type: Boolean, default: false},
           swaminarayan: {type: Boolean, default: false},
           faradi: {type: Boolean, default: false}
       }
   },
   cusine: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Cusine'
   },
   ingredients: [{
       ing: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Ingredient'
       },
       quantity: {type: String, required: false},
       unit: {type: String, required: false}
   }, {_id: false}],
   servings: {type: String, required: false},
   images: [{
       src: String
   }],
   recipe: {
       step: [{
           image: {type: String, required: false},
           description: {type: String, required: true}
       }, {_id: false}]
   },
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   },
   overallRatings: {
       type: Number,
    //    default: function(){
    //        if (this.feedback.ratings.length <= 0) {
    //            return 0;
    //        } else {
    //            var sum = 0
    //            var n = this.feedback.ratings.length
    //            for (let i = 0; i < this.feedback.ratings.length; i++) {
    //                const e = this.feedback.ratings[i].rate;
    //                sum = sum + e
    //            }
    //            return (sum/n)
    //        }
    //    }
   },
   feedback: {
       ratings: [{
           user: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
           },
           rate: {type: Number},
           comment: {type: String}
       }]
   }
}, {
    timestamps: true
})
 
module.exports = mongoose.model('Food', FoodSchema)
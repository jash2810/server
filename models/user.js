const mongoose = require('mongoose')
 
const UserSchema = new mongoose.Schema({
   cred: {
       username: {type: String, required: true, unique: true},
       password: {type: String, required: true}
   },
   details: {
       name: {type: String, required: true},
       contact: {
            mobile1: {type: Number, required: true},
            mobile2: {type: Number, required: false},
            email: {type: String, required: true}
       },
       dob: {type: String, required: false},
       age: {
           type: Number, 
           default: function() {
                // age calculation 
            }
        },
        address: {
            street: {type: String, required: false},
            area: {type: String, required: false},
            pincode: {type: String, required: false},
            city: {type: String, required: false},
            state: {type: String, required: false},
            country: {type: String, required: false, default: 'India'}
        }
   },
   urls: {
       website: {type: String, required: false, default: '#'},
       youtube: {type: String, required: false, default: '#'}
   },
   food: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Food'
   }],
   favourites: [{
       food: {type: mongoose.Schema.Types.ObjectId, ref: 'Food'},
       date: {type: Date, default: Date.now},
       _id: false
   }],
   feedback: {
       ratings: [{
           food: {type: mongoose.Schema.Types.ObjectId, ref: 'Food'}
       }]
   },
   history: {
       search: [{
           text: {type: String, required: false},
           date: {type: Date, required: false, default: Date.now}
       }],
       interestedIn: [{
            food: {type: mongoose.Schema.Types.ObjectId, ref: 'Food'},
            date: {type: Date, required: false, default: Date.now},
            cooked: {type: Boolean, required: false, default: false}
       }]
   }
}, {
    timestamps: true
})
 
module.exports = mongoose.model('User', UserSchema)
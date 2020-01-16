const db = require('../models')

exports.getUser = async (req, res, next) => {
    try {
        
        var userId = req.params.userId
        const user = await db.User.findById(userId)

        if (user) {
            res.json({success: true, msg: 'user found', user: user})
        } else {
            res.json({success: false, msg: 'user not found'})
        }

    } catch (err) {
        err.status = 400
        console.log(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        
        var userId = req.params.userId
        console.log(req.body)
        const user = await db.User.findByIdAndUpdate(userId, {
            $set: {
                details: {
                    name: req.body.name,
                    contact : {
                            mobile1 : req.body.mobile1,
                            mobile2 : req.body.mobile2,
                            email : req.body.email
                    },
                    dob : req.body.dob,
                    address : {
                        street : req.body.street,
                        area : req.body.area,
                        pincode : req.body.pincode,
                        city : req.body.city,
                        state : req.body.state,
                        country : req.body.country
                    }
                },
                urls: {
                    website: req.body.website,
                    youtube: req.body.youtube
                }
            }
        })

        res.json({user, success: true, msg: 'updated successfully'})
    } catch(err) {
        console.log(err)
    }
}
// local modules
const db = require('../models')

// libraries
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

/* ------------------------------------------------------------API's------------------------------------------------------------------- */
/* 
* @function = registers the user for the first time
* @uses = user data from front-end in schema format
* @created = @05-09-2019 -jash
*/
exports.registerUser = async (req, res, next) => {
    try {
        
        var newUser = new db.User(req.body)

        var plain = newUser.cred.password
        var saltRounds = 10

        await bcrypt.hash(plain, saltRounds, (err, hashed) => {
            if (err) {
                console.log(err)
            }
            newUser.cred.password = hashed

            newUser.save()

            res.json({newUser, success: true, msg: 'Congratulations! you have registered successfully.'})
        })      

    } catch (error) {
        error.status = 400
        console.log(error)
    }
}

/* 
* @function = login the user
* @uses = user data 'username and password'
* @created = @05-09-2019 -jash
*/
exports.loginUser = async (req, res, next) => {
    try {
        
        // console.log(req.body.cred)
        const {username, password} = req.body.cred

        const user = await db.User.find({
            'cred.username': username
        })

        if (user.length > 0) {
            // username match
            // console.log(user[0].cred.password)
            bcrypt.compare(password, user[0].cred.password)
                .then((status) => {
                    if (status === true) {
                        // password match
                        var id = user[0]._id

                        var token = jwt.sign({username, password, id}, 'PaleBlueDot')
                        res.cookie("user", token)                        
                        
                        res.json({success: true, msg: 'login successful', token: token})
                    } else {
                        // password incorrect
                        res.json({success: false, msg: 'password is incorrect'})
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            res.json({success: false, msg: 'username not found'})
        }

    } catch (error) {
        error.status = 400
        console.log(error)
    }
}

exports.authUser = async (req, res, next) => {
    try {
        
        if (req.cookies.user) {
            // there is a cookie
            next()
        } else {
            // ṭhere is no cookie
            next(ERROR('there is no user like this'))
        }

    } catch (error) {
        console.log(error)
    }
}

exports.verifyToken = async (req, res, next) => {
    try {
        console.log(req)
    } catch (error) {
        console.log(error)
    }
}
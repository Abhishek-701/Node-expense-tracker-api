const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async(req,res,next) => {
    try {
        const token = req.header('authorization').replace('Bearer ','')
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        const user = await User.findOne({ _id : decoded._id }) // 'tokens.token' : token 
        
        if(!user){
            throw new Error
        }
        

        req.user = user
        req.token = token
        next()

    } catch (e) {
        res.status(500).send('Please authenticate')
    }
}

module.exports = auth
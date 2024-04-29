const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter a valid email')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    }
})

const User =  mongoose.model('User', userSchema)

module.exports = User
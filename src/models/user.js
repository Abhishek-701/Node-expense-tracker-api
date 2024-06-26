const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        },
        
    },
    tokens : [{
        token : {
            type: String,
            required : true 
        }
    }],
},{
    timestamps: true
})

userSchema.virtual('expenses',{
    ref:'Expense',
    localField: '_id' ,
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function ()  {
    const user = this
    const token = jwt.sign({ _id : user._id.toString()  } , process.env.JWT_SECRET )


    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch){
        throw new Error("Unable to login")
    }

    return user
}

const User =  mongoose.model('User', userSchema)

module.exports = User

//Add logout
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerUser = async (req,res) => {
    try {
        
        const { name , email , password } = req.body
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name , email , password: hashedPassword })
        await newUser.save()

        res.status(201).json({ Message: 'User registered successfully' , newUser })
    } catch (e) {
        console.error('Registration error:', e);
        res.status(500).send()
    }
}

const loginUser = async (req,res) => {
   try {
    const {email , password} = req.body
    const user = await User.findOne({ email })
    console.log(user);
    if(!user){
        res.status(404).send()
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch){
        throw new Error('Invalid Credentials')
    }

    res.status(200).json({ message: 'Logged in Successfully'})

   } catch (e) {
     res.status(500).send()
   }
  
}

module.exports = {
    registerUser,
    loginUser
}
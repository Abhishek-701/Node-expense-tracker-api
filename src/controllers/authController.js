const User = require('../models/user')

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
    const user = await User.findByCredentials(email , password)

    const token = await user.generateAuthToken()

    res.status(200).json({ message: 'Logged in Successfully', token})

   } catch (e) {
     res.status(500).send()
   }
  
}

const logoutUser = async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
}

const logoutAll = async (req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    }catch{
        res.status(500).send()
    }
}


const getProfile = async (req,res) => {
    try {
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    logoutAll,
    getProfile
}
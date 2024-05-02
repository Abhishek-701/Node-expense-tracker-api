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

//Add generate auth token method in the User Model

module.exports = {
    registerUser,
    loginUser
}
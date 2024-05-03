const express = require('express')
const authController = require('../controllers/authController')
const auth= require('../middleware/authMiddleware')

const router = new express.Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', auth,authController.logoutUser)
router.post('/logoutAll', auth, authController.logoutAll)
router.get('/user/me', auth, authController.getProfile)


module.exports = router
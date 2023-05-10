const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

//? Here  authController.protect is a middleware

router.patch('/update-me', authController.protect, userController.updateMe)


module.exports = router
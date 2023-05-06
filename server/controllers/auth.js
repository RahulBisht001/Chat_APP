const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
require('dotenv').config()


const User = require('../models/user')
const filterObj = require('../utils/filterObj')


const signToken = (userId) => {
    jwt.sign({ userId }, process.env.JWT_SECRET)
}

//! __________________ Register EndPoint __________________


exports.register = async (req, res, next) => {

    const { firstName, lastName, email, password } = req.body

    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'password', 'email')

    //? check if a verified user with this email exist.

    const existing_user = await User.findOne({ email: email })

    if (!existing_user && existing_user.verified) {
        res.status(400).json({
            status: 'error',
            message: 'Email is already in use, try with different email',
        })
    }

    else if (existing_user) {
        const updated_user = await User
            .findOneAndUpdate({ email: email }, { ...req.body }, { new: true, validateModifiedOnly: true })

        req.userId = existing_user._id
        next()
    }
    else {

        const new_user = await User.create(filteredBody)
        req.userId = new_user._id
        next()
    }
}


//!  ________________   Login EndPoint   ____________________

exports.login = async (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({
            status: 'Error',
            message: 'Both email and password are required'
        })
    }

    /*     in 1. we were checking the user with the email as well as password field and
    because we need both later , so we need to return them {email, password } like this for
    the service.But in 2. we are finding user only with email but with help of .select() 
    method we are explicitly including the password field in the returned document.  */

    // const user = await User.findOne({ email: email, password: password })
    const user = await User.findOne({ email: email }).select("+password")

    if (!user || !(await user.correctPassword(password, user.password))) {
        res.status(400).json({
            status: 'error',
            message: 'Email or Password is incorrect'
        })
    }

    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        message: 'Logged in Successful',
        token,
    })
}

//!  ______________   Send OTP end point   ____________________

exports.sendOTP = async (req, res, next) => {

    const { userId } = req.body
    const new_otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })

    // Expiration time is 10 min
    const otp_expiry_time = Date.now() + 10 * 60 * 1000

    await User.findByIdAndUpdate(userId, {
        otp: new_otp,
        otp_expiry_time,
    })


    //Todo ____________ Send mail ______________

    res.status(200).json({
        status: 'success',
        message: 'OTP sent successfully'
    })
}

exports.verifyOTP = async (req, res, next) => {

    const { email, otp } = req.body

    const user = User.findOne({
        email,
        otp_expiry_time: { $gt: Date.now() },
    })

    if (!user) {
        res.status(400).json({
            status: 'error',
            message: 'email is Invalid or OTP expired'
        })
    }

    if (!await user.correctOTP(otp, user.otp)) {
        res.status(400).json({
            status: 'error',
            message: 'OTP is incorrect'
        })
    }

    user.verified = true
    user.otp = undefined

    await user.save({ new: true, validateModifiedOnly: true })

    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        message: 'OTP verified successfully !',
        token,
    })
}

exports.forgotPassword = async (req, res, next) => {

}


exports.resetPassword = async (req, res, next) => {

}
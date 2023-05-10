const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
const crypto = require('crypto')
const { promisify } = require('util')
require('dotenv').config({ path: '../config.env' })


const mailService = require('../services/mailer')

const User = require('../models/user')
const filterObj = require('../utils/filterObj')


const signToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET)
}

//!  ________________   Login EndPoint   ____________________

exports.login = async (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            status: 'Error',
            message: 'Both email and password are required'
        })
    }

    //~ Taking about down
    //^    in 1. we were checking the user with the email as well as password field and
    //^  because we need both later , so we need to return them {email, password } like this for
    //^  the service.But in 2. we are finding user only with email but with help of .select() 
    //^   method we are explicitly including the password field in the returned document. 

    // const user = await User.findOne({ email: email, password: password })
    const user = await User.findOne({ email: email }).select("+password")

    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(400).json({
            status: 'error',
            message: 'Email or Password is incorrect'
        })
    }

    const token = signToken(user._id)
    // console.log(token)

    return res.status(200).json({
        status: 'success',
        message: 'Logged in Successful',
        token,
    })
}

//! __________________ Register EndPoint __________________


exports.register = async (req, res, next) => {

    const { firstName, lastName, email, password } = req.body

    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'password', 'email')

    //^ check if a verified user with this email exist.

    const existing_user = await User.findOne({ email: email })

    if (existing_user && existing_user.verified) {
        return res.status(400).json({
            status: 'error',
            message: 'Email is already in use, log in or try with different email',
        })
    }

    else if (existing_user) {
        const updated_user = await User
            .findOneAndUpdate(
                { email: email },
                { ...req.body },
                { new: true, validateModifiedOnly: true })

        //^ Important Note --> check send OTP {userId}
        req.userId = existing_user._id
        next()
    }
    else {
        const new_user = await User.create(filteredBody)
        //^ Important Note
        req.userId = new_user._id
        next()
    }
}


//!  ______________   Send OTP end point   ____________________

exports.sendOTP = async (req, res, next) => {

    const { userId } = req
    //^ This is imp because here ( const { userId } = req) we are
    //^ we can't do it req.body because body and userId are on same level  userId is same as
    //^ body not the part of body
    const new_otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })

    //~ Expiration time is 10 min

    const otp_expiry_time = Date.now() + 10 * 60 * 1000

    const user = await User.findByIdAndUpdate(userId, {
        // otp: new_otp,
        otp_expiry_time,
    })

    user.otp = new_otp.toString()
    // user.otp = new_otp

    await user.save({ new: true, validateModifiedOnly: true })
    console.log(new_otp)

    //*  ____________ Send email

    mailService.sendEmail({
        from: 'rahulbishtrb1012@gmail.com',
        to: user.email,
        subject: 'This is your OTP for Hike',
        text: `OTP is ${new_otp}. This is only valid for 10 min`,
        attachments: []
    })
        .then(() => {
            return res.status(200).json({
                status: 'success',
                message: 'OTP sent successfully'
            })
        })
        .catch((err) => {
            console.log(err)
            console.log("Error while sending email from auth.js")

            return res.status(500).json({
                status: 'error',
                message: 'Error while sending email from auth.js'
            })
        })
}


//!  ______________   Verify OTP end point   ____________________

exports.verifyOTP = async (req, res, next) => {

    const { email, otp } = req.body

    const user = await User.findOne({
        email,
        otp_expiry_time: { $gt: Date.now() },
    })


    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'email is Invalid or OTP expired'
        })
    }

    if (!(await user.correctOTP(otp, user.otp))) {
        return res.status(400).json({
            status: 'error',
            message: 'OTP is incorrect'
        })
    }

    user.verified = true
    user.otp = undefined

    await user.save({ new: true, validateModifiedOnly: true })

    const token = signToken(user._id)

    return res.status(200).json({
        status: 'success',
        message: 'OTP verified successfully !',
        token,
    })
}

//!  ________________  protected end point   ______________________

exports.protect = async (req, res, next) => {

    //*   ____________ Step 1: Getting (JWT) token and if it is there

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        token = req.headers.authorization.split(' ')[1]
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }
    else {
        return res.status(400).json({
            status: 'error',
            message: 'You are not logged in. Please log in to get access!'
        })
    }

    //*   ________________ Step 2: verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.log("Decoded :" + decoded)

    //*  _________________ Step 3: Check if the user still exist
    const this_user = await User.findById(decoded.userId)

    if (!this_user) {
        return res.status(400).json({
            status: 'error',
            message: "User does't exist"
        })
    }

    //*  ____________ Step 4: Check if the user changed their password after token was issued
    if (this_user.changePasswordAfter(decoded.iat)) {

        return res.status(400).json({
            status: 'error',
            message: 'User recently updated password. Please log in again !'
        })
    }
    //^ Important Note
    req.user = this_user
    next()

}


//!  ______________   forgot password end point   ____________________

exports.forgotPassword = async (req, res, next) => {

    //*  ______ Step 1: get user's email
    const { email } = req.body
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'No user found with this email'
        })
    }

    //*  ______ Step 2: generator random reset token
    const resetToken = user.createResetPasswordToken()
    await user.save({ validateBeforeSave: false });
    // console.log("ResetToken")
    console.log(resetToken)
    const resetURL = `http://hike.com/auth/reset-password/?code=${resetToken}`

    try {
        //Todo => send email functionality
        return res.status(200).json({
            status: 'success',
            message: 'Reset password link sent on email'
        })

    } catch (err) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        await user.save({ validateBeforeSave: false })

        console.log("Error in forgotPassword method in authController")
        console.log(err)

        return res.status(500).json({
            status: 'error',
            message: 'error in sending email '
        })

    }
}

//!  ______________   resetPassword end point   ____________________

exports.resetPassword = async (req, res, next) => {

    //* ___________ step 1: get the user Based on the resetToken
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.body.token)
        .digest('hex')

    console.log(hashedToken)

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    })

    // console.log(user)

    //* ___________ step 2: Token expired or submission is out of time window

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'Token is invalid or expired'
        })
    }

    //* ____________ step 3: Update user password
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save({ new: true, validateBeforeSave: true })


    //* ____________ step 4: Log in user automatically & new JWT token

    //Todo   ________ send user an email regarding reset password successful
    const token = signToken(user._id)

    return res.status(200).json({
        status: 'success',
        message: 'password reset successful',
        token,
    })
}
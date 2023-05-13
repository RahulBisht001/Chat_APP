const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    avatar: {
        type: String,
    },
    about: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (email) => {
                return String(email)
                    .toLowerCase()
                    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            },
            message: (props) => `Email (${props.value}) is inValid !`,
        },
    },
    password: {
        type: String,
    },
    passwordConfirm: {
        type: String,
    },
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    otp_expiry_time: {
        type: Date,
    }
})


userSchema.pre('save', async function (next) {

    // only run this function if OTP is modified
    if (!this.isModified('otp') || !this.otp)
        return next()

    this.otp = await bcryptjs.hash(this.otp.toString(), 12)

    console.log(this.otp.toString(), "FROM PRE SAVE HOOK");
    next();
})


//^ New changes : According to the github repo
userSchema.pre('save', async function (next) {
    // console.log("Inside userSchema password middleware")

    // only run this function if password is modified
    if (!this.isModified('password') || !this.password)
        return next()

    this.passwordChangedAt = Date.now() - 1000;
    this.password = await bcryptjs.hash(this.password, 12)
    next()
})



userSchema.methods.correctPassword =
    async (candidatePassword, userPassword) => {
        return await bcryptjs.compare(candidatePassword, userPassword)
    }


userSchema.methods.correctOTP =
    async (candidateOTP, userOTP) => {
        return await bcryptjs.compare(candidateOTP, userOTP)
    }

//^ New changes : According to the github repo
userSchema.methods.changePasswordAfter =
    async function (JWT_timestamp) {
        if (this.passwordChangedAt) {
            const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
            return JWT_timestamp < changedTimeStamp
        }
        return false
    }



//! regular function is imp here , for the correct working of this keyword
userSchema.methods.createResetPasswordToken =
    async function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')

        this.passwordResetExpires = Date.now() + 10 * 60 * 1000
        return resetToken
    }


module.exports = mongoose.model('User', userSchema)
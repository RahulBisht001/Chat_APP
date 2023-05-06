const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const userSchema = mongoose.Schema({
    firstName: {
        type: true,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: true,
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
    },
    updatedAt: {
        type: Date,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Number,
    },
    otp_expiry_time: {
        type: Date,
    }
})


userSchema.pre('save', async function (next) {

    // only run this function if OTP is modified
    if (!this.isModified('otp')) {
        next()
    }

    this.otp = await bcryptjs.hash(this.otp, 12)
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

module.exports = mongoose.model('User', userSchema)
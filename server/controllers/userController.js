const User = require('../models/user')
const filterObj = require('../utils/filterObj')

exports.updateMe = async (req, res, next) => {

    const { user } = req;

    //^ filtering the req Body  to make the app more secure

    const filteredBody = filterObj(req.body, "firstName", "lastName", "about", "avatar")
    const updated_user = await User.findByIdAndUpdate(user._id, filteredBody,
        { new: true, validateModifiedOnly: true })

    return res.status(200).json({
        status: 'success',
        data: updated_user,
        message: 'Profile updated successfully'
    })
}


exports.getUsers = async (req, res, next) => {

    //^ Check for: getting all user who are verified and with that we are getting
    //^ an array of Objects firstName  lastName  _id : these three properties with

    const all_users = await User.find({
        verified: true
    }).select('firstName lastName _id')

    const this_user = req.user

    //^ getting all the user excluding itself and the user which are already your friend
    const remaining_users =
        all_users.filter((user) => !this_user.friends.includes(user._id)
            && user._id.toString() !== req.user._id.toString())


    res.status(200).json({
        status: 'success',
        data: remaining_users,
        message: 'Users found successfully'
    })
}
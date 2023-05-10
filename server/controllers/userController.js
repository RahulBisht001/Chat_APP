const User = require('../models/user')
const filterObj = require('../utils/filterObj')

exports.updateMe = async (req, res, next) => {

    const { user } = req;

    const filteredBody = filterObj(req.body, "firstName", "lastName", "about", "avatar")
    const updated_user = await User.findByIdAndUpdate(user._id, filteredBody,
        { new: true, validateModifiedOnly: true })

    return res.status(200).json({
        status: 'success',
        data: updated_user,
        message: 'Profile updated successfully'
    })
}
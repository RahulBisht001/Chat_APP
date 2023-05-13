const mongoose = require(mongoose)

const requestSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("FriendRequest", requestSchema)
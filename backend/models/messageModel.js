const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        },
        msg: String

    },
    { timestamps: true })


module.exports = mongoose.model('Message', messageSchema)
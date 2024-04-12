const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    }
})


module.exports = mongoose.model('Room', roomSchema)
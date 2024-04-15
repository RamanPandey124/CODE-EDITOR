const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    code: String
})


module.exports = mongoose.model('Team', teamSchema)
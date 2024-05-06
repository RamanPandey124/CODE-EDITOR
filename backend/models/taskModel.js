const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    // description: String,
    index: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)
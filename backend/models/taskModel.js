const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: String
})


module.exports = mongoose.model('Task', taskSchema)
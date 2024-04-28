const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model('Task', taskSchema)
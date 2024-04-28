const mongoose = require("mongoose")

const taskContainerSchema = new mongoose.Schema({
    teamId: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
    ]
})


module.exports = mongoose.model('TaskContainer', taskContainerSchema)
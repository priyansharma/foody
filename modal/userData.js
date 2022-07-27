const mongoose = require("mongoose")

const userDataSchema = new mongoose.Schema({
    userID:{
        type: Number,
        required: true,
        unique: true
    },
    todos:[
        {
            task: {
                type: String,
                required: true
            },
            isDone:{
                type: Boolean
            }
        }
    ]
})

const userData = new mongoose.model("userTodo", userDataSchema)
module.exports  = userData
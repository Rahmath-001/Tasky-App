import mongoose from "mongoose";

// import {Schema} from "mongoose";

let taskschema = mongoose.Schema ({
    user:{
        type:mongoose.Schema.Types.ObjectId ,
        ref: "Users"
        },
    tasks: [
        {
          task_name: {type: String,
              required:true},
          deadline: {type: Date,
              required:true},
          isCompleted: {type: Boolean,
              default:false},
          reminders: {
              type: [Date],
              required: true,
          },
          isCompleted: {
            type: Boolean,
            default:false,
          }
        }
    ]
})

const taskmodel= new mongoose.model("Tasks", taskschema, "Users_Tasks")

export default taskmodel

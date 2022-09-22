import mongoose from "mongoose";


const schema = mongoose.Schema;

const tasks=new schema({
    tasks: [
        {
          task_name: {type: String,
              required:true},
          deadline: {type: Date,
              required:true},
          isCompleted: {type: Boolean,
              default:false},
          reminders: {
              type: [date]
          }
        }
    ]
})


const userschema = new schema({
    user:{
    firstname:
        {type : String,
        required:true},
    lastname: 
        {type: String,
        required:true},
    email: 
        {type: String,
        required:true},
    password: 
        {type: String,
        required:true},
    address: 
        {type: String,
        required:true},
    phone: 
        {type: String,
        required:true},
    },
    tasks: {
        tyupe:[tasks]
    } 
})

const usermodel= new mongoose.model("Hotel", userschema, "User DB")

export default usermodel
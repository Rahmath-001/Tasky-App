import mongoose from "mongoose";


const Schema = mongoose.Schema;

const tasks=new Schema({
    tasks: [
        {
          task_name: {type: String,
              required:true},
          deadline: {type: Date,
              required:true},
          isCompleted: {type: Boolean,
              default:false},
          reminders: {
              type: [Date]
          }
        }
    ]
})


const userschema = new Schema({
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

const userModel= new mongoose.model("Users", userschema, "Userds_DB")

export default userModel
import mongoose from "mongoose";

let taskschema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    tasks: [
      {
        task_name: { type: String, required: true },
        deadline: { type: Date, required: true },
        isCompleted: { type: Boolean, default: false },
        reminders: {
          type: [Date],
          required: true,
        },
      },
    ],
  });


const userschema = new  mongoose.Schema({
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
    // address: 
    //     {type: String,
    //     required:true},
    // phone: 
    //     {type: String,
    //     required:true},  
    tasks: {
        type:[taskschema]
    },
    // userverifytoken:{
    //     email: {
    //         type: String,
    //         required: true
    //     },
    //     phone: {
    //         type: String,
    //         required: true
    //     }
    // },
    passwordresettoken: {
        type: String,
        default: null
    },
    isSuspended: {
        type: Boolean,
        default: false
    }
})


const userModel= new mongoose.model("Users", userschema, "Users_DB")

export default userModel











// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// const tasks = new Schema({
//   task_name: {
//     type: String,
//     required: true,
//   },
//   deadline: {
//     type: Date,
//     required: true,
//   },
//   isCompleted: {
//     type: Boolean,
//     default: false,
//   },
//   reminders: {
//     type: [Date],
//   },
// });
// const userSchema = new Schema({
//   firstname: {
//     type: String,
//     required: true,
//     maxlength: 25,
//     minlength: 2,
//   },
//   lastname: {
//     type: String,
//     required: true,
//     maxlength: 25,
//     minlength: 2,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   tasks: {
//     type: [tasks],
//   },
// });
// const userModel = new mongoose.model("Users", userSchema, "users_DB");
// export default userModel;
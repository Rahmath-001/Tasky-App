import mongoose from "mongoose";

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
    },
    userverifytoken:{
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    // passwordresettoken: {
    //     type: String,
    //     default: null
    // },
    isSuspended: {
        type: Boolean,
        default: false
    }
});

const userModel= new mongoose.model("Users", userschema, "Userds_DB")

export default userModel
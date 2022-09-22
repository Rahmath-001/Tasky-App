import mongoose from "mongoose";

async function connectdb(){
    try {
        await mongoose.connect("mongodb+srv://rahmath:rahmath@apidata.sposgew.mongodb.net/User_Data")
        console.log("Mongo DB is CONNECTED . . .  ")
    } catch (error) {
        console.log(error);
    }
}

connectdb();
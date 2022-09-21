import mongoose from "mongoose";

// const {schema} = mongoose;


const schema = mongoose.Schema;

const hotelschema = new schema({
    firstname:{
        type:String,
        required:true,
        maxlenght:25,
        minlength: 2
    },
    lastname:{
        type:String,
        required:true,
        maxlenght:25,
        minlength: 2
    },
    addrress:{
        type:String,
        required:true,
        maxlenght:25,
        minlength: 2
    },
    email:{
        type:String,
        required:true,
        maxlenght:25,
        minlength: 2
    },
    address:{
        type:String,
        required:true,
        maxlenght:25,
        minlength: 2
    },
    phone:{
        type:String,
        required:true,
        maxlenght:25,
        minlength: 2
    },
    zipcode:{
        type:String,
        required:true
    },
    checkindate:{
        type:String,
        required:true
    },
    checkoutdate:{
        type:String,
        required:true
    },
    checkintime:{
        type:String,
        required:true
    },
    checkouttime:{
        type:String,
        required:true
    },
    noofadults:{
        type:number,
        max:5,
        min:1
    },
    noofchildren:{
        type:number,
        max:5,
        min:1
    },
    noofrooms:{
        type:number,
        max:5,
        min:1
    },
    roomtype:{
        type:[]
    },
    specialInstructions:{
        type:String,
        maxlength:250
    }
})
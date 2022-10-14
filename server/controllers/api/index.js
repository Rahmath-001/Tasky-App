import express from "express";
import {loginvalidation, registervalidation, errormiddleware } from "../../middleware/validation/index.js"
import fs from "fs/promises";
import bcrypt from "bcrypt";
import config from "config";


import "../../dbconnect.js"
import generateToken from "../../middleware/auth/generateToken.js";
import { randomString, sendEmail, sendSMS } from "../../utils/index.js"
import Users from "../../models/users/index.js";
import taskmodel from "../../models/tasks/index.js";
import userModel from "../../models/users/index.js";
const router=express.Router();

/*
METHOD : POST

PUBLIC
API Endpoint : /api/login
Body : 

email
password
*/



 router.post("/login", loginvalidation(), errormiddleware, async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ "error": "Some Fields Are Missing " });
        }

        let userFound = await userModel.findOne({email})  
        // fileData = JSON.parse(fileData);

        // let userFound = fileData.find((ele) => ele.email == email)
        if (!userFound) {
            return res.status(401).json({ "error": "Invalid Credentials email " });
           }
       // console.log(userFound);
       let matchPassword = await bcrypt.compare(password, userFound.password)
       console.log(matchPassword);
          if (!matchPassword) {
              return res.status(401).json({ "error": "Invalid Credentials " });
             }

         let payload = {
              user_id: userFound.user_id,
             role: "user"
          }

       // let privatekey = "codeforindia";    

       //GENERATE A TOKEN
       const token = generateToken(payload);
       // console.log(token);

       await userModel.save

       res.status(200).json({ success: "Login is Successful", token })


    } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" })
    }
   })


   

router.post("/signup",loginvalidation(),errormiddleware, async (req,res)=> {
      
      try {

        let { firstname, lastname, email, password,phone } = req.body;
        // console.log(req.body);
        //Avoid Double Registration
        let userData = await userModel.findOne({ email });
        if (userData) {
            return res.status(409).json({ "error": "Email Already Registered" })
        }
        // userData = await userModel.findOne({ phone });
        // if (userData) {
        //     return res.status(409).json({ "error": "Email Already Registered phone" })
        // }

        req.body.password = await bcrypt.hash(password, 12);
        console.log(req.body.password)
        const user = new userModel(req.body);

        user.userverifytoken = randomString(15);
        await user.save();

        res.status(200).json({ "success": "User Registered Successfully" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Internal Server Error" })
    }
})


router.get("/", (req,res)=> {
    try {
     res.status(400).json({success :"Router Started and Working"})
    } catch (error) {
     res.status(400).json({error :"Internal server error"})
    }
 })

export default router;



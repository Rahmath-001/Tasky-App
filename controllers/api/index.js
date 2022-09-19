import express from "express";
import { loginValidation,registerValidation, errorMiddleware } from "../../middleware/validation/index.js"


const router=express.Router();

/*
METHOD : POST

PUBLIC
API Endpoint : /api/login
Body : 

email
password
*/



router.post("/login",loginValidation(),errorMiddleware, (req,res)=> {
   try {
    res.status(200).json({success :"Router Started and Working"})
   } catch (error) {
    res.status(500).json({error :"router not working"})
   }
})

router.post("/signup",loginValidation(),errorMiddleware, (req,res)=> {
   try {
    res.status(200).json({success :"Router Started and Working"})
   } catch (error) {
    res.status(500).json({error :"router not working"})
   }
})


router.get("/", (req,res)=> {
    try {
     res.status(400).json({success :"Router Started and Working"})
    } catch (error) {
     res.status(400).json({error :"router not working"})
    }
 })


export default router;
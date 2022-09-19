import { body, validationresult } from "express-validator";

function loginvalidation(){
    return[
        body('email', 'Email is Required').isEmail(),
        body('password', 'password is Required').notEmpty(),        
    ]
}

function errormiddleware(req,res,next){
    const errors= validationresult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({})
    }
}
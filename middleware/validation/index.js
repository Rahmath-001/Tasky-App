import { body, validationresult } from "express-validator";

function loginvalidation(){
    return[
        body('email', 'Email is Required').isEmail(),
        body('password', 'password is Required').notEmpty(),        
    ]
}

function registervalidation() {
    return [
        body('firstname', "First Name is Required").notEmpty().isLength({ max: 30 }),
        body('lastname', "Lastname is Required ").notEmpty().isLength({ max: 30 }),
        body('email', "Email Is Invalid").isEmail(),
        body('password', "Password should be Min 8 Characters, Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character").isStrongPassword(),
        body("password2").custom(
            (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password & Confirm Password do not match");
                } else {
                    return true;
                }
            }
        ),
        body('phone', "Mobile Phone is Invalid").isMobilePhone(),
    ]
}


function errormiddleware(req,res,next){
    const errors= validationresult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    return next();
}

export {loginvalidation, registervalidation, errormiddleware}
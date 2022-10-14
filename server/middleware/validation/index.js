import {body,validationResult} from "express-validator";


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


function scheduletaskvalidation(){
    return [
        body("taskname", "task name cannot be empty").notEmpty(),
        body("deadline").custom(value =>{

            if(new Date(value)== "Invalid Date")
            throw new Error("Invalid Date Entered")
                let deadline= new Date(value);
                let min=(deadline - new Date()) / (1000 * 60) 
                let days=(deadline - new Date()) / (1000 * 60 * 60 * 24)
            if(min<30 || days>30){
                throw new Error("Inavlid Date Entered, Deadline must be more than 30 min and less than 30 days.")
            }
            else{
                throw true;
            }
        })

    ]
}



function editTaskvalidation (){
    const rules = scheduletaskvalidation()

    return [
        ...rules,
        body("isCompleted", "isCompleted cannot be empty and should be boolean").isBoolean(),
    ]
}





function errormiddleware(req,res,next){
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    return next();
}

export {loginvalidation, registervalidation, errormiddleware,scheduletaskvalidation}
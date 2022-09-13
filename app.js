import express, { json } from "express"
import fs from "fs/promises";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken" ;
import randomstring from "./utils/randomstring.js";


const app = express();
const port = 5000;


//JSON Body Parser
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({ success: "Welcome To the Tasky Application" })
})

/*
METHOD : POST
API Endpoint : /api/signup
Body : 
firstname ; 
lastname
phone
email
password 
password2
address
*/






app.post("/api/signup", async (req, res) => {
    try {
        console.log(req.body);
        let { firstname, lastname, email, password, address, phone } = req.body;
        // let body = req.body;

        if (!email || !firstname || !lastname || !phone || !address || !password) {
            return res.status(400).json({ "error": "Some Fields Are Missing " });
        }
        // if (password !== password2) {
        //     return res.status(400).json({ "error": "Passwords are Not Same" });
        // }


        // check duplication of email and mobile

        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);

        console.log(fileData);

        let emailfound= fileData.find((ele)=> ele.email==email);
        if(emailfound){
            return res.status(409).json({error:"User Already Registered, Please Login Again "})
        }

        let nofound=fileData.find((ele)=> ele.phone==phone);
        if(nofound){
            return res.status(409).json({error : "User phone Already  Registered, Please Login Again "})
        }

        // fileData.forEach((ele)=>{
        //     console.log(ele.email);
        // })


        password = await bcrypt.hash(password, 12);

        let user_id= randomstring(16);
        // console.log(user_id);


        let userdata= {user_id, firstname, lastname, email, password, address, phone };
        userdata.tasks=[]
        // userdata.firstname= firstname;
        // console.log(userdata)

        fileData.push(userdata);

        await fs.writeFile("data.json", JSON.stringify(fileData));
        res.status(200).json({ success: "User Signed Up Succesfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})









app.post("/api/login", async (req, res)=>{
    try {
        
        let {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({error: "Some Fields Are MISSING"})
        }


        let filedata= await fs.readFile("data.json");
        filedata= JSON.parse(filedata);
        // let matchpassword=bcrypt.compare

        let userfound= filedata.find((ele)=> ele.email == email)
        if (!userfound){
            return res.status(401).json({error:"Invalid Credentials"});
        }
        console.log(userfound)

        let matchpassword= await bcrypt.compare(password,userfound.password)
        if(!matchpassword){
            return res.status(401).json({error : "Invalid Credentials."})
        }

        let playload= {
            user_id: userfound.user_id,
            role: "user"
        }


        let privatekey = "admin-route";
        
        const token= jwt.sign(playload,privatekey,{expiresIn:"7d"});
        // console.log(token)
        res.status(200).json({success: "Login is successful", token})



    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal Server Error FOUND"})   
    }
})








app.post("/api/task", async(req,res)=> { 
    try {

        // console.log(req.headers)
        // console.log(req.headers["auth-token"])
       
        let token = req.headers["auth-token"]
        if(!token){
            return res.status(401).json({error : "Unauthorised ACCESS"})
        }

        const playload=jwt.verify(token, "admin-route")
        console.log(playload)
        if(!playload){
            return res.status(401).json({error : "Unauthorised ACCESS"})
        }

        //check req.body

        let {task_name, deadline}=req.body;
        if (!task_name || !deadline) {
            return res.status(400).json({error : "Some Fields Are Missing"})
        }
        console.log(task_name, deadline)
    

        
        let utc_deadline= new Date(deadline);
        if(utc_deadline=="Invalid Date"){
            return res.status(400).json({error : "Invalid Date Entered"})
        }
        // console.log(new Date() <utc_deadline);


        let fileData= await fs.readFile("data.json")
        fileData=JSON.parse(fileData);


        let userfound=fileData.find((ele)=>ele.user_id == playload.user_id);
        // console.log(userfound);

        let task_data={
            task_id:randomstring(14),
            task_name,
            deadline: utc_deadline,
            isCompleted: false
        }

        // console.log(task_data)
        userfound.tasks.push(task_data);

        // console.log(userfound)
        console.log(fileData)

        await fs.writeFile("data.json",JSON.stringify(fileData));
        res.status(200).json({success: "POST Route is UP for TASK"})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server ERROR"})
    }
})





app.listen(port, () => {
    console.log("Server Started at Port ", port);
})


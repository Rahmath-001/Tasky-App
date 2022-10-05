import express from "express";
import router from "./controllers/api/index.js";
import taskRouter from "./controllers/tasks/index.js"
import userModel from "./models/users/index.js";
// import  util from "util";
import "./dbconnect.js"
import taskmodel from "./models/tasks/index.js";

const app = express();

const port = 5500;

// APP LEVEL MIDDLE WARE
app.use(express.json())

app.get("/", (req,res)=> {
    res.status(200).json({success :"HELLO FROM EXPRESS"})
})

app.use("/api",router)
app.use("/api",taskRouter)


// app.get("/api/")


// app.get("/use", (req, res, next) => {
//     try {
//         console.log("HELLO FROM USE");
//         console.log(req.payload);
//         console.log(req.adnan);
//         console.log(req.chetan);
//         res.status(200).json({ success: "Next Middleware" })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error " })
//     }
// })


app.post("/api/data", async (req,res)=> {

    try {

        let user_data= new userModel(req.body);
        console.log(user_data.user)

        let {email}=req.body;
        const userdata= await taskmodel.findOne({email});
        if (userdata){
            return res.status(409).json({error:"Already registered"})
        }
        
        await user_data.save()
        // console.log(user_data)
        
        res.status(200).json({success:"Server working for taking Data"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server ERROR"})
        
    }
})




app.listen(port,()=> {
    console.log("Server Started at port : ",port)
})
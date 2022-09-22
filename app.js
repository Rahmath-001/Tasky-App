import express from "express";
import apiRouter from "./controllers/api/index.js"
import taskRouter from "./controllers/tasks/index.js"
import usermodel from "./models/user.js";


const app = express();

const port = 5500;

// APP LEVEL MIDDLE WARE
app.use(express.json())

app.get("/", (req,res)=> {
    res.status(200).json({success :"HELLO FROM EXPRESS"})
})

app.use("/api",apiRouter())
app.use("/api/task",taskRouter())

app.get("/use", (req, res, next) => {
    try {
        console.log("HELLO FROM USE");
        console.log(req.payload);
        console.log(req.adnan);
        console.log(req.chetan);
        res.status(200).json({ success: "Next Middleware" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error " })
    }
})


app.post("/api/data", async (req,res)=> {

    try {

        let user_data= new usermodel(req.body);
        console.log(user_data)

        await user_data.save()
        
        res.status(200).json({success:"Server working  for Booking"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server ERROR"})
        
    }
})




app.listen(port,()=> {
    console.log("Server Started at port : ",port)
})
import express from "express";
import apiRouter from "./controllers/api/index.js"
import taskRouter from "./controllers/tasks/index.js"


const app = express();

const port = 5500;

// APP LEVEL MIDDLE WARE
app.use(express.json())

app.get("/", (req,res)=> {
    res.status(200).json({success :"HELLO FROM EXPRESS"})
})

app.use("/api",apiRouter())
app.use("/api/task",taskRouter())

app.listen(port,()=> {
    console.log("Server Started at port : ",port)
})
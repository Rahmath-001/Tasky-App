import express from "express";

const app=express();

import "./dbconnect.js";

const port=5000;

app.get("/", (req,res)=> {
    res.status("server IS UP")
})

app.listen(port, (req,res)=> {
    console.log("server Started at port ", port)
})
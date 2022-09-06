import http from "http";

const port=5000;

const server=http.createServer((req,res)=>{
    console.log(req.headers);
    // res.setHeader("Content-Type","application/json")
    // console.log(req.body);
    
    res.end("This is a RAHMATH's HTTP server");
    // res.statusCode(200).json({"success":"Hello"})
})

server.listen(port, ()=>{
    console.log("Server Started at port ",port)
})
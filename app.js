import express from "express"
import fs from "fs/promises";
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
        // console.log(req.body);
        let { firstname, lastname, email, password, password2, address, phone } = req.body;
        let body = req.body;

        // console.log(email);
        if (!email || !firstname || !lastname || !phone || !address || !password || !password2) {
            return res.status(400).json({ "error": "Some Fields Are Missing " });
        }
        if (password !== password2) {
            return res.status(400).json({ "error": "Passwords are Not Same" });
        }
        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);
        fileData.push(body);
        await fs.writeFile("data.json", JSON.stringify(fileData));
        res.status(200).json({ success: "User Signed Up Succesfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.listen(port, () => {
    console.log("Server Started at Port ", port);
})


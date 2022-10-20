import express from "express";
import fs from 'fs/promises';

const router=express.Router();



app.get("/api/verify/mobile/:phonetoken", async (req, res) => {
    try {
        let phoneToken = req.params.phonetoken;
        console.log(phoneToken);

        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);

        let userFound = fileData.find((ele) => ele.verifyToken.phoneToken == phoneToken)
        console.log(userFound);
        if (userFound.isVerified.phone == true) {
            return res.status(200).json({ success: "Phone already Verified" })
        }
        userFound.isVerified.phone = true;
        await fs.writeFile("data.json", JSON.stringify(fileData));
        res.status(200).json({ success: "Phone is Verified" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})




router.get("/verify/email/:emailtoken", async (req,res) => {
    try {
        let emailToken = req.params.emailtoken;
        // console.log(emailToken);

        let userFound = await userModel.findOne({ "userverifytoken.email": emailToken });
        // console.log(userFound);

        if (userFound.userverified.email == true) {
            return res.status(200).json({ success: 'Email already Verified' });
        }

        userFound.userverified.email = true;
        await userFound.save();

        res.status(200).json({ success: 'Email is Verified' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});








export default router;
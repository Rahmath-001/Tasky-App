import express  from "express";
import authMiddleware from "../../middleware/auth/verifyToken.js";
import { scheduleJob, scheduledJobs, cancelJob } from "node-schedule";
import fs from "fs/promises";
import jwt from 'jsonwebtoken'

import { randomString, sendEmail, sendSMS } from "../../utils/index.js";
import userModel from "../../models/users/index.js";
import taskmodel from "../../models/tasks/index.js";
// import randomString from "../../utils/";
// import sendEmail from "../utils/sendMail.js";
// import sendSMS from "../utils/sendSMS.js";


const router=express.Router();


router.post("/task", authMiddleware, async (req,res)=> {
   try {

        //Check for Authorization 
        // let token = req.headers["auth-token"];
        // if (!token) {
        //     return res.status(401).json({ error: "Unauthorised Access" });
        // }
        const payload = req.payload;
        // console.log(payload);
        if (!payload) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }

        //Check Req.body

        let { task_name, deadline } = req.body;
        if (!task_name || !deadline) {
            return res.status(400).json({ error: "Some Fields are Missing" });
        }

        //    console.log(task_name, deadline);


        let utc_deadline = new Date(deadline);
        //Check if format is Right or Not
        //Check if its Backdated or Not

        let present_time = new Date();
        // console.log(present_time);
        // console.log(utc_deadline < present_time);

        if (utc_deadline == "Invalid Date" || (utc_deadline < present_time)) {
            return res.status(400).json({ error: "Invalid Date Entered" });
        }
        // console.log(utc_deadline);

        //Check Validation for 30 mins and 30 Days
        let difference = utc_deadline - present_time;


        //Difference in Minutes
        let mins = difference / (1000 * 60)
        // console.log(mins);

        let days = difference / (1000 * 60 * 60 * 24);
        // console.log(days);

        //Not Less than 30 mins and Not more than 30 Days
        if (mins < 30 || days > 30) {
            return res.status(400).json({ error: "Invalid Date Entered, Deadline Should be More than 30 mins and Less than 30 Days" });
        }

        //Get Reminders
        let reminders = [];

        let reminder1 = new Date((+present_time) + (difference / 4));
        // console.log(reminder1);

        let reminder2 = new Date((+present_time) + (difference / 2));
        // console.log(reminder2);

        let reminder3 = new Date((+present_time) + (difference / (4 / 3)));
        // console.log(reminder3);

        reminders.push(reminder1, reminder2, reminder3, utc_deadline);
        console.log(reminders);


        //Reading File Data
        // let fileData = await fs.readFile("data.json");
        // fileData = JSON.parse(fileData);

        let userFound  = await userModel.findOne({userModel: payload.user_id})
        console.log(userFound)

        // let userFound = fileData.find((ele) => ele.user_id == payload.user_id)
        // console.log(userFound);
        let task_id = randomString(14)
        let task_data = {
            task_id,
            task_name,
            deadline: utc_deadline,
            isCompleted: false,
            reminders
        }


        task_data.reminders.forEach((ele, i) => {
            // console.log(ele);
            scheduleJob(`${task_id}_${i}`, ele, () => {
                sendEmail({
                    subject: "This is a  Reminder",
                    to: userFound.email,
                    html: `<p>Hi ${userFound.firstname}, <br>
                    This is a Reminder - ${i + 1} to Complete your Task ${task_name} <br>
                    <b>CFI Tasky App</b>
                    </p>`
                })
                //Add Logic for Body
                // console.log(`hey ${userFound.firstname}, this is your ${i + 1} reminder for your task : ${task_data.task_name}`);
                // console.log(new Date());
            })
            // console.log(i);
        })
        // console.log(scheduledJobs);

        // console.log(task_data);
        console.log(userFound.tasks);
        
        // await JSON.stringify(fileData)
        // userFound.tasks.push(task_data);
        userFound.tasks.push(task_data);
        // console.log(userFound);
        // console.log(fileData);

        
        // await fs.writeFile("data.json", JSON.stringify(fileData));
        await userFound.save()

    res.status(200).json({success :"Task was Added"})
   } catch (error) {
    console.error(error)
    res.status(500).json({error :"Internal Server Error"})
   }
})






router.get("/tasks",authMiddleware ,async (req,res)=>{
    try {
        const payload= req.body;

        let taskData = await taskmodel.findOne({user:payload.user_id});
        console.log(taskData)

        res.status(200).json({tasks:taskData.tasks})
       } catch (error) {
        res.status(500).json({error :"Interval Server Error"})
       }
})




router.get("/:task_id", authMiddleware, async (req,res)=>{
    try {
        const payload= req.body;
        console.log(req.params.task_id)

        let taskData = await taskmodel.findOne({user:payload.user_id});
        console.log(taskData)

        let taskFound= taskData.tasks.find((ele)=> ele._id == req.params.task_id)
        console.log(taskFound)

        res.status(200).json({success :"TASK Found", task:taskFound})
       } catch (error) {
        res.status(500).json({error :"Interval Server Error"})
       }
})



router.delete("/:task_id", authMiddleware,async (req, res) => {
    try {

        const payload= req.body;
        console.log(req.params.task_id)

        let taskData = await taskmodel.findOne({user:payload.user_id});
        console.log(taskData);

        let taskIndex= taskData.tasks.findIndex((ele)=> ele._id == req.params.task_id);
        console.log(taskIndex);
    
        console.log(taskData.tasks[taskIndex])
        taskData.tasks[taskIndex].reminders.forEach((ele,i)=>{
            cancelJob(`${taskData.tasks[taskIndex]._id}_${i}`)
        })

        await taskData.save()
        taskData.tasks.splice(taskIndex,1);



        res.status(200).json({ success: "Task is Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Interval Server Error" });
    }
})



router.put("/:task_id",authMiddleware,async (req,res)=>{


    try {
        

        res.status(200).json({ success: "Task is Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Interval Server Error" });
    }


})




export default router;
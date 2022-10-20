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
        // console.log(reminders);


        let taskData = await Tasks.findOne({ user:payload.user_id }).populate("user",["firstname", "phone", "email"]);
    // console.log(taskData);

    let task_data = {
      taskname,
      deadline: new Date(deadline),
      isCompleted: false,
      reminders,
    };

    taskData.tasks.push(task_data);

    await taskData.save();
    res.status(200).json({ success: "Task wask Added Successfully" });

    let job_id = taskData.tasks[taskData.tasks.length - 1]._id.toString();
    // console.log(job_id);

    task_data.reminders.forEach((ele, i) => {
      scheduleJob(`${job_id}_${i}`, ele, () => {
        if (reminders.length - 1 == i) {
          sendEmail({
            subject: `This is a Deadline Reminder for your Task ${task_data.taskname}`,
            to: taskData.user.email,
            html: `<p>Hi ${taskData.user.firstname}, <br>
            			Your deadline for  ${taskname} has been passed. <br>
            			<b>CFI Tasky App</b>
            			</p>`,
          });
        } else {
          sendEmail({
            subject: `This is a Reminder for your Task ${task_data.taskname}`,
            to: taskData.user.email,
            html: `<p>Hi ${taskData.user.firstname}, <br>
            			This is a Reminder - ${i + 1} to Complete your Task ${taskname} <br>
            			<b>CFI Tasky App</b>
            			</p>`,
          });
        }
      });
    })

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
        // console.log(req.params.task_id)

        let taskData = await taskmodel.findOne({user:payload.user_id});
        // console.log(taskData)

        let taskFound= taskData.tasks.find((ele)=> ele._id == req.params.task_id)
        console.log(taskFound)

        if (!taskFound) {
            res.status(404).json({ "error": "Task Not Found" });
          }

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
        // console.log(taskData);

        let taskIndex= taskData.tasks.findIndex((ele)=> ele._id == req.params.task_id);
        // console.log(taskIndex);
        // console.log(taskData.tasks[taskIndex])

        taskData.tasks[taskIndex].reminders.forEach((ele,i)=>{
            cancelJob(`${taskData.tasks[taskIndex]._id}_${i}`)
        })

     
        taskData.tasks.splice(taskIndex,1);

        await taskData.save()

        res.status(200).json({ success: "Task is Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Interval Server Error" });
    }
})



router.put("/:task_id",authMiddleware,async (req,res)=>{


    try {
        let task_id = req.params.task_id;

    const payload = req.payload;
    if (!payload) {
      return res.status(401).json({ error: "Unauthorised Access" });
    }

    let { taskname, deadline, isCompleted } = req.body;

    let utc_deadline = new Date(deadline);

    let present_time = new Date();

    //Check Validation for 30 mins and 30 Days
    let difference = utc_deadline - present_time;

    //Get Reminders
    let reminders = [];

    let reminder1 = new Date(+present_time + difference / 4);
    // console.log(reminder1);

    let reminder2 = new Date(+present_time + difference / 2);
    // console.log(reminder2);

    let reminder3 = new Date(+present_time + difference / (4 / 3));
    // console.log(reminder3);

    reminders.push(reminder1, reminder2, reminder3, new Date(deadline));
    // console.log(reminders);

    let taskData = await Tasks.findOne({ user: payload.user_id }).populate("user", ["firstname", "email", "phone"]);
    let taskFound = taskData.tasks.find((ele) => ele._id == req.params.task_id);
    // console.log(taskFound);

    if (!taskFound) {
      res.status(404).json({ "error": "Task Not Found" });
    }
    // console.log(taskFound._id);

    taskFound.reminders.forEach((ele, i) => {
      cancelJob(`${taskFound._id}_${i}`)
    })

    // taskIndex.task_id = task_id;
    taskFound.taskname = taskname;
    // console.log(taskFound.taskname);
    taskFound.deadline = new Date(deadline);
    taskFound.isCompleted = isCompleted;
    taskFound.reminders = reminders;

    // Save To DB
    await taskData.save();
    res.status(200).json({ success: "Reminder Has Been Edited" });

    if (isCompleted == false) {
      let job_id = taskFound._id.toString();
      reminders.forEach((ele, i) => {
        scheduleJob(`${job_id}_${i}`, ele, () => {
          if (reminders.length - 1 == i) {
            sendEmail({
              subject: `This is a Deadline Reminder for your Task ${taskname}`,
              to: taskData.user.email,
              html: `<p>Hi ${taskData.user.firstname}, <br>
                            Your deadline for  ${taskname} has been passed. <br>
                            <b>CFI Tasky App</b>
                            </p>`,
              });
          } else {
            sendEmail({
              subject: `This is a Reminder for your Task ${taskname}`,
              to: taskData.user.email,
              html: `<p>Hi ${taskData.user.firstname}, <br>
                            This is a Reminder - ${i + 1} to Complete your Task ${taskname} <br>
                            <b>CFI Tasky App</b>
                            </p>`,
            });
          }
        });
      })
    }

        res.status(200).json({ success: "Task is Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Interval Server Error" });
    }


})




export default router;
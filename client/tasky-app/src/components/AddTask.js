import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";


function AddTask({alert, showAlert}) {

    const navigate = useNavigate();

    const [newtask, setNewtask] = useState({
        taskname: "",
        deadline: "",
    })

    const { taskname, deadline } = newtask;

    const onChangeHandler = (e) => {
        setNewtask({
            ...newtask,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            console.log(newtask);
            let token = JSON.parse(localStorage.getItem("token")).token
            let res = await axios.post("/api/task", newtask, {
                headers: {
                    "auth-token": token
                }
            });
            console.log(res.data);
            // showAlert({
            //     type : "success",
            //     msg : res.data.success
            // })
            navigate("/user");
        } catch (error) {
            if (error.response.data.errors) {
                let errorString = "";
                error.response.data.error.forEach(element => {
                    errorString += element.msg
                });
                //     showAlert({
                //   addtask      type : "error",
                //         msg : errorString
                //     })
                // }
                // else {
                //     showAlert({
                //         type : "error",
                //         msg : error.response.data.error
                //     })
                // }
                // console.log("catch");
                // console.log(error.response.data.error);
            }
        }
    }
    return (
        <>

        <NavBar/>
        <center>
            <div className="login-box">
           <h1 style={{fontSize:"45px"}}>Add Task</h1>
                <form onSubmit={onSubmitHandler}>
                    <input type="text" id="taskname" name="taskname" placeholder="Task Name" value={taskname} onChange={onChangeHandler} required /> <br />
                    <input type="datetime-local" id="deadline" name="deadline" placeholder="DeadLine" value={deadline} onChange={onChangeHandler} required /><br /><br />
                    <input type="submit" value="Add Task" />
                </form>
                </div>
            </center>
        </>
    )
}

export default AddTask;
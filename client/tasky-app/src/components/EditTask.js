import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function EditTask(){

    const navigate = useNavigate();

    const [edittask, setEdittask] = useState({
        taskname: "",
        deadline: "",
        isCompleted:""
    })

    return(
        <><center>
            <h1>Edit Task</h1>
        <form>
            <input type="text" id="taskname" name="taskname" placeholder="Task Name" required /><br />

            <input type="datetime-local" id="deadline" name="deadline" placeholder="DeadLine" required />

            <input type="text" id="isCompleted" name="isCompleted" placeholder="Yes or No" required /><br />

            <input type="submit" value="Edit Task" />
        </form>
        </center>
        </>
    )
}

export default EditTask;
import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { Link, useNavigate, useLocation } from "react-router-dom";

function EditTask() {
  const navigate = useNavigate();

  const { state } = useLocation();

  const [edittask, setEditTask] = useState({
    taskname: state.name,
    deadline: "",
    isCompleted: Boolean(),
  });

  const { taskname, deadline, isCompleted } = edittask;

  const onChangeHandler = (e) => {
    setEditTask({
      ...edittask,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(edittask);
      let token = JSON.parse(localStorage.getItem("token")).token;
      let res = await axios.put(`/api/task/${state.e}`, edittask, {
        headers: {
          "auth-token": token,
        },
      });
      navigate("/Dashboard");
    } catch (error) {
      if (error.response.data.errors) {
        let errorString = "";
        error.response.data.errors.forEach((element) => {
          errorString += element.msg;
        });
      }
    }
  };

  return (
    <>
    <Header/>
      <center>
        <h1 style={{fontsize:"10px"}}>Edit Task</h1>
        <br/><br/>
        <div className="login-box">
        <form onSubmit={onSubmitHandler} id="form">
          <div className="user-box">
            <input
              type="text"
              id="taskname"
              name="taskname"
              placeholder="Task Name"
              value={taskname}
              onChange={onChangeHandler}
              required
            />
            <br />
            <br></br>
          </div>
          <div className="user-box">
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={deadline}
              placeholder="DeadLine"
              onChange={onChangeHandler}
              required
            />
          </div>
          <br></br>
          <div className="user-box">
            <input
              type="text"
              id="isCompleted"
              name="isCompleted"
              placeholder="Yes or No"
              value={isCompleted}
              onChange={onChangeHandler}
              required
            />
            <br />
          </div><br></br>

          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {/* submit */}
            <input type="submit" value="Edit task"></input>
            {/* <Link to="/user">Submit </Link> */}
          </a>

          {/* <input type="submit" value="Edit Task" /> */}
        </form>
        </div>
      </center>
    </>
  );
}

export default EditTask;

// <form  id="form" onSubmit={onSubmitHandler} >

// <div className="user-box">
//   <input type="email"  name="email" autoComplete="off"  value={email} onChange={onChangeHandler} />
//   <label>Email</label>
// </div>

// <div className="user-box">
//   <input type="password"  name="password" autoComplete="off"  value={password} onChange={onChangeHandler} />
//   <label>Password</label>
// </div>

// <a href="#">
//   <span></span>
//   <span></span>
//   <span></span>
//   <span></span>
//   {/* submit */}
//   <input type="submit" value="login" ></input>
//   {/* <Link to="/user">Submit </Link> */}
// </a>
// </form>

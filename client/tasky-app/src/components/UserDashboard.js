import Header from "./Header";
import React, { useState, useEffect } from "react";
import clock from "../components/assets/clock.png";
import tick from "../components/assets/tick.png";
import Loading from "../components/assets/Loading.gif";
import NavBar from "./Navbar";


import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard(Loading) {


     
  
        

  let navigate = useNavigate();
  let [tasks, setTasks] = useState([]);
  let [dummy, setDummy] = useState([]);

  function navigating(e, name) {
    console.log(e);
    navigate("/editTask", { state: { e, name } });
  }

  useEffect(() => {
    async function verifyAuth() {
      try {
        let token = JSON.parse(localStorage.getItem("token")).token;
        let { data } = await axios.get("/api/auth", {
          headers: {
            "auth-token": token,
          },
        });
      } catch (error) {
        console.error(error.response.data);
        navigate("/login");
      }
    }
    verifyAuth();

    async function getalltasks() {
      try {
        let token = JSON.parse(localStorage.getItem("token")).token;
        let { data } = await axios.get("/api/task/tasks", {
          headers: {
            "auth-token": token,
          },
        });
        setTasks(data.alltasks.tasks);
        console.log(tasks);
      } catch (error) {
        console.error(error.response.data);
      }
    }
    getalltasks();
  }, []);

  async function deleteTask(id) {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;
      setTasks(tasks.filter((ele) => ele._id !== id));
      let data = await axios.delete(`/api/task/${id}`, {
        headers: {
          "auth-token": token,
        },
      });
    } catch (error) {
      console.error(error.response.data);
    }
  }
  console.log(tasks);
  return (
    <>
      {/* {loading && <Loading />} */}
      <Header />
      <NavBar/>
      <br></br><br></br>
      <br></br><br></br>
      <center>
        <h1 style={{ display: "inline", margin: "230px" }}>Dashboard</h1>{" "}
        <Link to="/AddTask" className="add-task">Add Task</Link>
        <table id="dashboard">
          <thead>
            <tr>
              {/* <th>Task ID</th> */}
              <th>Task Name</th>
              <th>Deadline</th>
              <th>Is Completed</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => {
              console.log(task.isCompleted);
              // tasks.isCompleted ? tick : clock
                
              // {
              //     let date=new Date( {task.deadline} )
              //     date = date.toLocaleString()
              //   }


              return (

                
                
                <tr key={i}>
                  {/* <td>{task._id}</td> */}
                  <td>{task.taskname}</td>
                  <td>{(new Date(task.deadline)).toLocaleString()}</td>
                  <td>
                    {task.isCompleted ? (
                      <img
                        style={{ width: "35px" }}
                        src={tick}
                        alt="Loading.."
                      />
                    ) : (
                      <img
                        style={{ width: "35px" }}
                        src={clock}
                        alt="Loading.."
                      />
                    )}
                  </td>

                  <td>
                    <button type="button" onClick={() => navigating(task._id)}>
                      Edit Task
                    </button>
                    <button onClick={() => deleteTask(task._id)}>
                      Delete Task
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </center>
      <br />
      <br />

      <Footer />
    </>
  );
}

export default Dashboard;



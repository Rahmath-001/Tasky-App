// import React,{useEffect, useNavigate, useState} from 'react'
// import axios from 'axios';
// import { Outlet, Navigate } from "react-router-dom";



// function UserDashboard() {

//     let navigate = useNavigate;
//     let [tasks, setTasks] = useState([]);


//     useEffect(()=>{
//         async function verifyAuth(){
//             try {
//                 let {data}= await axios.get("/api/auth",
//                 {
//                     headers: {
//                         "auth-token": JSON.parse(localStorage.getItem("token")).token
//                     }
//                 });
//             } catch (error) {
//                 localStorage.removeItem("token");
//                     navigate("/login")
//             }
//         }
//         // verifyAuth();


//         async function getalltasks(){
//           try {
//             let token = JSON.parse(localStorage.getItem("token")).token
//             let {data}= await axios.get("/api/auth",
//             {
//                 headers: {
//                     "auth-token": token
//                 }
//             });
//           } catch (error) {
//             console.error(error.response.data)
//           }
//         } 
//           getalltasks()
//     },[])



//     return (


//         <>
        
        
//         <div className="container-dashboard">
//   {/* <h2>Responsive Tables Using LI Triggers</h2> */}
//   <center>
//   {/* <h1>User Dashboard</h1> */}



//       <br></br>
//   <form onsubmit="event.preventDefault();" role="search">
//   <input id="search" type="search" placeholder="Search..." autofocus required />
//   <button type="submit">Go</button>    
// </form>
// </center>



//   <ul className="responsive-table-dashboard">
//     <li className="table-header-dashboard">
//       <div className="col col-1">Job Id</div>
//       <div className="col col-2">Customer Name</div>
//       <div className="col col-3">Amount Due</div>
//       <div className="col col-4">Payment Status</div>
//     </li>
//     <li className="table-row-dashboard">
//       <div className="col col-1" data-label="Job Id">42235</div>
//       <div className="col col-2" data-label="Customer Name">John Doe</div>
//       <div className="col col-3" data-label="Amount">$350</div>
//       <div className="col col-4" data-label="Payment Status">Pending</div>
//     </li>
//     <li className="table-row-dashboard">
//       <div className="col col-1" data-label="Job Id">42442</div>
//       <div className="col col-2" data-label="Customer Name">Jennifer Smith</div>
//       <div className="col col-3" data-label="Amount">$220</div>
//       <div className="col col-4" data-label="Payment Status">Pending</div>
//     </li>
//     <li className="table-row-dashboard">
//       <div className="col col-1" data-label="Job Id">42257</div>
//       <div className="col col-2" data-label="Customer Name">John Smith</div>
//       <div className="col col-3" data-label="Amount">$341</div>
//       <div className="col col-4" data-label="Payment Status">Pending</div>
//     </li>
//     <li className="table-row-dashboard">
//       <div className="col col-1" data-label="Job Id">42311</div>
//       <div className="col col-2" data-label="Customer Name">John Carpenter</div>
//       <div className="col col-3" data-label="Amount">$115</div>
//       <div className="col col-4" data-label="Payment Status">Pending</div>
//     </li>
//   </ul>
// </div>
        
        
//         </>

        
//     )
// }

// export default UserDashboard;


























import React, { useState, useEffect } from 'react';
import clock from "../components/assets/clock.png";
import tick from "../components/assets/tick.png";
import Loading from "../components/assets/Loading.gif";

import Footer from './Footer';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Dashboard(Loading) {
  
  let navigate = useNavigate();
  let [tasks, setTasks] = useState([])
  let [dummy, setDummy] = useState([])
  useEffect(() => {
    async function verifyAuth() {
      try {
        let token = JSON.parse(localStorage.getItem("token")).token
        let { data } = await axios.get("/api/auth", {
          headers: {
            "auth-token": token
          }
        })
      } catch (error) {
        console.error(error.response.data)
        navigate("/login")
      }
    } 
    verifyAuth();


    async function getalltasks() {
      try {
        let token = JSON.parse(localStorage.getItem("token")).token
        let { data } = await axios.get("/api/tasks", {
          headers: {
            "auth-token": token
          }
        })
        setTasks(data.alltasks.tasks);
        console.log(tasks);
        
      } catch (error) {
        console.error(error.response.data)
      }
    }getalltasks();

  }, [])
  console.log(tasks);
  return (
    <>

      {/* {loading && <Loading />} */}

      <center>
        <h1 style={{ display: "inline", margin: "230px" }}>Dashboard</h1> <Link to="/AddTask" >Add Task</Link>
        <table id="dashboard" >

          <thead >
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Is Completed</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              
              tasks.map((task, i) => {
                console.log(task.isCompleted)
                // tasks.isCompleted ? tick : clock
               
                return (<tr key={i}>
                  <td>{task._id}</td>
                  <td>{task.taskname}</td>
                  <td>{task.isCompleted ? <img style={{ width: "35px" }} src={tick} alt="Loading.." /> : <img style={{ width: "35px" }}  src={clock} alt="Loading.." />}</td>
                  <td><Link to="/edittask"><button type='button'>Edit</button></Link><button>Delete</button></td> 
                </tr>)
              })
            }
          </tbody>
        </table>
      </center><br /><br />

      <Footer />

      </>
  )
}

export default Dashboard;
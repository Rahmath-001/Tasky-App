import React,{useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { Outlet, Navigate } from "react-router-dom";



function UserDashboard() {

    let navigate = useNavigate();
    useEffect(()=>{
        async function verifyAuth(){
            try {
                let {data}= await axios.get("/api/auth",
                {
                    headers: {
                        "auth-token": JSON.parse(localStorage.getItem("token")).token
                    }
                });

                if (data.payload.role !== "user"){
                    localStorage.removeItem("token");
                    navigate("/login")
                }
            } catch (error) {
                localStorage.removeItem("token");
                    navigate("/login")
            }
        }
    },[])



    return (


        <>
        
        
        <div class="container">
  {/* <h2>Responsive Tables Using LI Triggers</h2> */}
  <center>
  {/* <h1>User Dashboard</h1> */}

      <br></br>
  <form onsubmit="event.preventDefault();" role="search">
  <input id="search" type="search" placeholder="Search..." autofocus required />
  <button type="submit">Go</button>    
</form>
</center>



  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-1">Job Id</div>
      <div class="col col-2">Customer Name</div>
      <div class="col col-3">Amount Due</div>
      <div class="col col-4">Payment Status</div>
    </li>
    <li class="table-row">
      <div class="col col-1" data-label="Job Id">42235</div>
      <div class="col col-2" data-label="Customer Name">John Doe</div>
      <div class="col col-3" data-label="Amount">$350</div>
      <div class="col col-4" data-label="Payment Status">Pending</div>
    </li>
    <li class="table-row">
      <div class="col col-1" data-label="Job Id">42442</div>
      <div class="col col-2" data-label="Customer Name">Jennifer Smith</div>
      <div class="col col-3" data-label="Amount">$220</div>
      <div class="col col-4" data-label="Payment Status">Pending</div>
    </li>
    <li class="table-row">
      <div class="col col-1" data-label="Job Id">42257</div>
      <div class="col col-2" data-label="Customer Name">John Smith</div>
      <div class="col col-3" data-label="Amount">$341</div>
      <div class="col col-4" data-label="Payment Status">Pending</div>
    </li>
    <li class="table-row">
      <div class="col col-1" data-label="Job Id">42311</div>
      <div class="col col-2" data-label="Customer Name">John Carpenter</div>
      <div class="col col-3" data-label="Amount">$115</div>
      <div class="col col-4" data-label="Payment Status">Pending</div>
    </li>
  </ul>
</div>
        
        
        </>

        
    )
}

export default UserDashboard;
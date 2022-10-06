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
        <h1>UserDashboard</h1>
    )
}

export default UserDashboard;
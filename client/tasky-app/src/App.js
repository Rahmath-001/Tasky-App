import './App.css';
import axios from 'axios'
import Main from './components/Main';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import PrivateRoutes from './components/PrivateRoute';
import UserDashboard from './components/UserDashboard.js'
import AdminDashboard from './components/AdminDashboard.js'

import Register from "./components/Register.js" 

import {
  Routes,
  Route,
} from "react-router-dom";




function App() {

  
  const [alert,setAlert]=useState(null);
  const [loading, setLoading]=useState(false);
  const [booksData, setbooksData]= useState([])



  useEffect(() => {
    async function getBooks() {
      try {
        setLoading(true);
        let { data } = await axios.get("api/books");
        setbooksData(data.booksData);
        setLoading(false);
      } catch (error) {
        console.error(error.response.data);
      }
    }
    getBooks();
  }, [])

   
    const showAlert=(data)=>{
      setAlert({
          type:data.type,
          msg:data.msg
        })
        setTimeout(()=>{
          setAlert(null);
        },5000)
    }


  return (
    <>
    <Routes>
    
    <Route path='/' element={<Main booksData={booksData} loading={loading}/>}/>

      <Route path='/Register' element={<Register alert={alert} showAlert={showAlert}/>}></Route>
      <Route path='/login' element={<Login
          alert={alert}
          showAlert={showAlert}
        />} />

        <Route element={<PrivateRoutes/>}>
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      </Routes>
    </>
  );
}

export default App;

//Note : in-line styling in React JSx must be sent as object)key-value pair

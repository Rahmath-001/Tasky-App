import Header from "./Header";
import NavBar from "./Navbar";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";


function Register({ alert, showAlert }) {
  // const navigate= useNavigate();

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstname, lastname, email, password, password2 } = userData;

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      //prevents refreshing the form
      e.preventDefault();
      console.log(userData);
      let res = await axios.post("/api/signup", userData);
      console.log(res.data);
      showAlert({
        type: "success",
        msg: res.data.success,
      });
      Navigate("/login")
    } catch (error) {
      if (error.response.data.errors) {
        let errorString = "";
        error.response.data.errors.forEach((ele) => {
          errorString += ele.msg;
        });
        showAlert({
          type: "error",
          msg: errorString,
        });
      } else {
        showAlert({
          type: "error",
          msg: error.response.data.error,
        });
      }
    }
  };

  return (
    <>
      <Header content={"User Register"} />
      <br></br>
      <NavBar/>

      <div class="login-box">
        <h2>Login</h2>
        {alert !== null && <h3 className={`alert-${alert.type}`} >{alert.msg}</h3>}
      
        <form  id="form" onSubmit={onSubmitHandler} >
         
          <div class="user-box">
          <input type="text" id="lname" name="firstname" autoComplete="off"  value={firstname} onChange={onChangeHandler} /><br/>
          <label>Firstname</label>
          </div>

          <div class="user-box">
          <input type="text" id="lname" name="lastname" autoComplete="off"  value={lastname} onChange={onChangeHandler} /><br/>
          <label>Lastname</label>
          </div>

          <div class="user-box">
            <input type="email" id="lname" name="email" autoComplete="off"  value={email} onChange={onChangeHandler} />
            <label>Email</label>
          </div>

          <div class="user-box">
            <input type="password" id="lname" name="password" autoComplete="off"  value={password} onChange={onChangeHandler} />
            <label>Password</label>
          </div>

          <div class="user-box">
          <input type="password" id="lname" name="password2" autoComplete="off"  value={password2} onChange={onChangeHandler} /><br/>
          <label>Confirm Password</label>
          </div>


          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {/* register */}
            <input type="submit" value="Register" ></input>
          </a>
        </form>
      </div>

      {/* 
            <div className="container">
                {alert !== null && <h3 className={`alert-${alert.type}`} >{alert.msg}</h3>}
                <div id="body" className="body">
                <div>
                    <form id="form" onSubmit={onSubmitHandler}>
                        <input type="text" id="lname" name="firstname" autoComplete="off" placeholder="First name.." value={firstname} onChange={onChangeHandler} />
                        <br></br><br></br>

                        <input type="text" id="lname" name="lastname" autoComplete="off" placeholder="Last name.." value={lastname} onChange={onChangeHandler} />
                        <br></br><br></br>

                        <input type="email" id="lname" name="email" autoComplete="off" placeholder="Email" value={email} onChange={onChangeHandler} />
                        <br></br><br></br>

                        <input type="password" id="lname" name="password" autoComplete="off" placeholder="Password" value={password} onChange={onChangeHandler} />
                        <br></br><br></br>

                        <input type="password" id="lname" name="password2" autoComplete="off" placeholder="Confirm Password" value={password2} onChange={onChangeHandler} /><br/>

                        <Link to="/login"><input type="register" value="Register"  /> </Link>

                    </form>
                </div>
                     <br></br> <br></br>
                     <label for="lname">Already Registered ?</label>
                     <Link to="/login"> Login</Link>
                    <br></br><br></br>
            </div>
            </div> */}
    </>
  );
}
export default Register;

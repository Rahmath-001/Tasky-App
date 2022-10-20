
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";

function Login({ alert, showAlert }) {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = userData;

    const onChangeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
          navigate("/user");
        }   
    }, [])
    const onSubmitHandler = async (e) => {
        try {
            //Prevents Refreshing the Form
            e.preventDefault();
            // console.log(userData);
            let res = await axios.post("/api/login", userData);
            // console.log(res.data);
            localStorage.setItem("token", JSON.stringify({ token: res.data.token, role: res.data.role }))
            navigate("/user")
            showAlert({
                type: "success",
                msg: res.data.success
            })
        } catch (error) {

            if (error.response.data.errors) {
                //Handling Express Validators
                let errorString = "";
                error.response.data.errors.forEach((ele) => {
                    errorString += ele.msg
                })
                showAlert({
                    type: "error",
                    msg: errorString
                })
            } else {
                //Custom Errors
                showAlert({
                    type: "error",
                    msg: error.response.data.error
                })
            }
            // console.log("Catch")
            console.log(error.response.data.error);
        }
    }
    return (
        <>
            <Header content={"User Login"} />
            <NavBar/>


            <div class="login-box">
        <h2>Login</h2>
        {alert !== null && <h3 className={`alert-${alert.type}`} >{alert.msg}</h3>}
      
        <form  id="form" onSubmit={onSubmitHandler} >
         

          <div class="user-box">
            <input type="email"  name="email" autoComplete="off"  value={email} onChange={onChangeHandler} />
            <label>Email</label>
          </div>

          <div class="user-box">
            <input type="password"  name="password" autoComplete="off"  value={password} onChange={onChangeHandler} />
            <label>Password</label>
          </div>


          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {/* submit */}
            <input type="submit" value="login" ></input>
            {/* <Link to="/user">Submit </Link> */}
          </a>
        </form>
      </div>




      {/* <div className="container">
        {alert !== null && (
          <h3 className={`alert-${alert.type}`}>{alert.msg}</h3>
        )}

        <div id="body" className="body">
            <br></br>
          <div>
            <form id="form" onSubmit={onSubmitHandler}>
              <input
                type="email"
                id="lname"
                name="email"
                autoComplete="off"
                placeholder="Email"
                value={email}
                onChange={onChangeHandler}
              />
              <br></br>
              <br></br>

              <input
                type="password"
                id="lname"
                name="password"
                autoComplete="off"
                placeholder="Password"
                value={password}
                onChange={onChangeHandler}
              />
              <br></br>
              <br></br>

              <Link to="/user"><input type="login" value="Login" /> </Link>
            </form>
          </div>
          <br></br> <br></br>
          <label htmlFor="lname">Not Yet Registered ?</label>
          <Link to="/register"> Register</Link>
          <br></br>
          <br></br>
        </div>
      </div> */}
        </>
    )
}
export default Login;


































// import { Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function Login({alert, showAlert }) {
//   const [userData, setUserData] = useState({
//     email: "",
//     password: "",
//   });

//   const { email, password } = userData;

//   const onChangeHandler = (e) => {
//     setUserData({
//       ...userData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onSubmitHandler = async (e) => {
//     try {
//       //prevents refreshing the form
//       e.preventDefault();
//       console.log(userData);
//       let res = await axios.post("/api/login", userData);
//       console.log(res.data);
//       showAlert({
//         type: "success",
//         msg: res.data.success,
//       });
//     } catch (error) {
//       if (error.response.data.errors) {
//         let errorString = "";
//         error.response.data.errors.forEach((ele) => {
//           errorString += ele.msg;
//         });
//         showAlert({
//           type: "error",
//           msg: errorString,
//         });
//       } else {
//         showAlert({
//           type: "error",
//           msg: error.response.data.error,
//         });
//       }
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         {alert !== null && (
//           <h3 className={`alert-${alert.type}`}>{alert.msg}</h3>
//         )}

//         <div id="body" className="body">
//           <h3> FORM FOR REGISTERING</h3>
//           <div>
//             <form id="form" onSubmit={onSubmitHandler}>
//               <input
//                 type="email"
//                 id="lname"
//                 name="email"
//                 autoComplete="off"
//                 placeholder="Email"
//                 value={email}
//                 onChange={onChangeHandler}
//               />
//               <br></br>
//               <br></br>

//               <input
//                 type="password"
//                 id="lname"
//                 name="password"
//                 autoComplete="off"
//                 placeholder="Password"
//                 value={password}
//                 onChange={onChangeHandler}
//               />
//               <br></br>
//               <br></br>

//               <input type="submit" value="Login" />
//             </form>
//           </div>
//           <br></br> <br></br>
//           <label htmlFor="lname">Not Yet Registered ?</label>
//           <Link to="/register"> Register</Link>
//           <br></br>
//           <br></br>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;


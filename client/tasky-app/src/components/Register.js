import Header from "./Header";
import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom';

function Register({alert,showAlert}){

    // const navigate= useNavigate();


    const  [userData,setUserData]=useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        password2:""
    })

    const {firstname,lastname,email,password,password2}= userData;

    const onChangeHandler= (e)=>{
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        try {
            //prevents refreshing the form
            e.preventDefault();
            console.log(userData);
            let res = await axios.post("/api/signup", userData);
            console.log(res.data);
            showAlert({
                type:"success",
                msg: res.data.success
            })
            // navigate("/login")
        } catch (error) {
            
            if(error.response.data.errors){

                let errorString="";
                error.response.data.errors.forEach((ele)=>{
                    errorString+=ele.msg
                })
                showAlert({
                    type:"error",
                    msg: errorString
                })

            }else{
                showAlert({
                    type:"error",
                    msg: error.response.data.error
                })
            }


        }
    }

    return (
        <>


            <Header content={"User Register"} />
            <br></br>

            <div className="container">
                <div>
                    <center>
                    <img className="image" src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" 
                 alt= "books" style={{ width: '26%' }} />
                    </center>
                </div>

                {alert !== null && <h3 className={`alert-${alert.type}`} >{alert.msg}</h3>}


                <div id="body" className="body">
            <h3> FORM FOR REGISTERING</h3>

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

                        <input type="password" id="lname" name="password2" autoComplete="off" placeholder="Confirm Password" value={password2} onChange={onChangeHandler} /><br />
                        
                        {/* <input type="submit" value="Register"  /> */}
                        <Link to="/login"><input type="submit" value="Register"  /> </Link>
                    </form>
                </div>
                     <br></br> <br></br>
                     <label for="lname">Already Registered ?</label>
                     <Link to="/login"> Login</Link>
                    <br></br><br></br>
            </div>
            </div>

           
        </>
    )
}
export default Register;
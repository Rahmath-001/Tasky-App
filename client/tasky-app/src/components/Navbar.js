import {Link} from 'react-router-dom' 
import logo from "./assets/task-app-logo.png"

function NavBar() {

	function logout(){
		localStorage.removeItem("token")
	}
    return (
     <>
     
     
     <a href="/" className="logo" target="_blank">
		<img className='image' src={logo} alt=""></img>
	</a>

  	<input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	<label htmlFor="menu-icon"></label>
  	<nav className="nav"> 		
  		<ul className="pt-5">
  			<li><Link to={"/"}>HOME</Link></li>
  			<li><Link to={"/register"}>REGISTER</Link></li>
  			<li><Link to={"/login"}>LOGIN</Link></li>
			  <li><Link onClick={logout} to={"/login"}>LOGOUT</Link></li>

  		</ul>
  	</nav>
     
     
     </>
    )
}

export default NavBar;
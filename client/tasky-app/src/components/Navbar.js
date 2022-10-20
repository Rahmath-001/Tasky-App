import {Link} from 'react-router-dom' 
import logo from "./assets/task-app-logo.png"

function NavBar() {
    return (
     <>
     
     
     <a href="https://github.com/Rahmath-001" class="logo" target="_blank">
		<img className='image' src={logo} alt=""></img>
	</a>

  	<input class="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	<label for="menu-icon"></label>
  	<nav class="nav"> 		
  		<ul class="pt-5">
  			<li><Link to={"/home"}>HOME</Link></li>
  			<li><Link to={"/register"}>REGISTER</Link></li>
  			<li><Link to={"/login"}>LOGIN</Link></li>
  		</ul>
  	</nav>
     
     
     </>
    )
}

export default NavBar;
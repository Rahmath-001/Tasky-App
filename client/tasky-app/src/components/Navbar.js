import {Link} from 'react-router-dom' 


function NavBar() {
    return (
        <div className="navbar">

            <Link to="/">HOME</Link>
            <Link to="/register">REGISTER</Link>
            <Link to="/login">LOGIN</Link>
            <Link to="/contactus">CONTACT US</Link>
        </div>
    )
}

export default NavBar;
import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return(

    <nav>
      <Link to="/">Home</Link> &nbsp; | &nbsp;
      <Link to="/login.js">Log In</Link> &nbsp; | &nbsp;
      <Link to="/signup.js">Sign up</Link> &nbsp; | &nbsp;
      <Link to="/account.js">Account</Link> &nbsp; | &nbsp;
      <Link to="/genPassword.js">Passwords</Link>
    </nav>

    // COULDN'T DO IT THIS WAY

    // <nav>
    //   <a href="homePage.js">Logo Here</a> &nbsp; | &nbsp;
    //   <a href="login.js">Log In</a> &nbsp; | &nbsp;
    //   <a href="signup.js">Sign Up</a> 
    // </nav>

  )
}

export default Navbar
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"

const Navbar = () => {
  
  const [isloggedIn, setisloggedIn] = useState()

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if(response.data.loggedIn === true){
        setisloggedIn(true)
      }else{
        setisloggedIn(false)
      }
    })
  }, [])

  // Axios.get("http://localhost:3001/login").then((response) => {
  //   if(response.data.loggedIn === true){
  //     setisloggedIn(true)
  //   }else{
  //     setisloggedIn(false)
  //   }
  // })
  
  return(
    <>
      <nav>
        
        <Link to="/">Home</Link> &nbsp; | &nbsp;
        
        {isloggedIn ? 
        <>
          <Link to="/signout.js">Sign Out</Link> &nbsp; | &nbsp;
          <Link to="/account.js">Account</Link> &nbsp; | &nbsp;
          <Link to="/genPassword.js">Passwords</Link>
        </>
        :
        <>
          <Link to="/login.js">Log In</Link> &nbsp; | &nbsp;
          <Link to="/signup.js">Sign up</Link>
        </>
        }
        
        {/* <Link to="/login.js">Log In</Link> &nbsp; | &nbsp;
        <Link to="/signup.js">Sign up</Link> &nbsp; | &nbsp;
        <Link to="/account.js">Account</Link> &nbsp; | &nbsp;
        <Link to="/genPassword.js">Passwords</Link> &nbsp; | &nbsp; */}
      </nav>
    </>
  )
}

export default Navbar
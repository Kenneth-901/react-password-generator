import React, { useEffect, useState } from "react"
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './navBarElement';
import Axios from "axios"
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const isloggedIn = window.localStorage.getItem("isLoggedIn");
  
  return(
    <>
      <Nav>
        <Bars />
        {isloggedIn ? (
          <>
            <NavMenu>
              <NavLink to="/" activeStyle>Home</NavLink>
              <NavLink to="/account" activeStyle>Account</NavLink>
              <NavLink to="/genPassword.js" activeStyle>Passwords</NavLink>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to="/signout.js">Sign Out</NavBtnLink> 
            </NavBtn>
          </>
        ) : (
          <>
            <NavMenu>
              <NavLink to="/" activeStyle>Home</NavLink>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to="/login.js">Log In</NavBtnLink>
              <NavBtnLink to="/signup.js">Sign up</NavBtnLink>
            </NavBtn>
          </>
        )}
        
      </Nav>
    </>
  )
}

export default Navbar


{/* {isloggedIn && isloggedIn.length > 0 ? <NavLink to="/">Sign Out</NavLink> : 
<NavLink to="/login.js">Log In</NavLink>
} &nbsp; | &nbsp; */}
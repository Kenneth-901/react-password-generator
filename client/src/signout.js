import React, { useEffect, useState } from "react"
import Navbar from "./NavBar/navbar"
import Footer from "./footerContainer"
import Axios from "axios"
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      localStorage.removeItem("token", response.data.token);
      localStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("userID");
      sessionStorage.removeItem("email2");
      navigate("/")
    })

    Axios.post("http://localhost:3001/signout").then((response) => {
      navigate("/")
    })
  }, [])

  return(
    <>
      <Navbar />

      <h1>Sign out successful</h1>

      <Footer />
    </>
  )
}

export default SignOut
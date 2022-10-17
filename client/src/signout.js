import React, { useEffect, useState } from "react"
import Navbar from "./navbar"
import Footer from "./footer"
// import { Link } from "react-router-dom"
import Axios from "axios"
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response + "login")
      localStorage.removeItem("token", response.data.token)
      navigate("/")
    })

    Axios.post("http://localhost:3001/signout").then((response) => {
      console.log(response + "signout")
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
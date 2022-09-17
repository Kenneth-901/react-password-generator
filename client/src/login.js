import React, { useState } from "react"
import Footer from "./footer"
import Navbar from "./navbar"

const Login = () => {
  
  const [vali_email, setemail] = useState("")
  const [vali_pass, setpass] = useState("")

  return(
    <>
      <Navbar />

      <br />

      <form>
        <input 
          type="email" 
          name="checkEmail"
          onChange={(event) => {setemail(event.target.value)}}
          placeholder="Email"
        />

        <br />

        <input 
          type="password" 
          name="checkPassword"
          onChange={(event) => {setpass(event.target.value)}}
          placeholder="Password"
        />  

        <br />

        <input type="submit" value="Log In"/>
      </form>

      <Footer />
    </>
  )
}

export default Login
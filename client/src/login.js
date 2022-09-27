import React, { useState } from "react"
import Footer from "./footer"
import Navbar from "./navbar"

const Login = () => {
  
  const [vali_email, setvaliemail] = useState("")
  const [vali_pass, setvalipass] = useState("")

  return(
    <>
      <Navbar />

      <br />

      <form>
        <input 
          type="email" 
          name="checkEmail"
          onChange={(event) => {setvaliemail(event.target.value)}}
          placeholder="Email"
        />

        <br />

        <input 
          type="password" 
          name="checkPassword"
          onChange={(event) => {setvalipass(event.target.value)}}
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
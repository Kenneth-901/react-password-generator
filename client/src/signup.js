import React, { useState } from "react"
import Footer from "./footer"
import Navbar from "./navbar"

const Signup = () => {
  
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [dob, setdob] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")

  
  return(
    <>
      <Navbar />

      <br />

      <form>
        <input 
          type="text" 
          name="fName"
          onChange={(event) => {setfirstName(event.target.value)}}
          placeholder="First Name"
        />

        <br />

        <input 
          type="text" 
          name="lName"
          onChange={(event) => {setlastName(event.target.value)}}
          placeholder="Last Name"
        />  

        <br />

        <input 
          type="text" 
          name="newEmail"
          onChange={(event) => {setemail(event.target.value)}}
          placeholder="Email"
        />

        <br />

        <input 
          type="password" 
          name="newPassword"
          onChange={(event) => {setpassword(event.target.value)}}
          placeholder="Password"
        />

        <br />

        {/* Need to change the format here & db cause here is 
        "mm/dd/yyyy" while db is varchar */}
        <input 
          type="date" 
          name="newDOB"
          onChange={(event) => {setdob(event.target.value)}}
          placeholder="DOB"
        />

        <br />

        <input 
          type="tel" 
          name="newPhoneNumber"
          onChange={(event) => {setphoneNumber(event.target.value)}}
          placeholder="Phone Number"
        />

        <br />

        <input type="submit" value="Sign Up"/>
      </form>
      <Footer />
    </>
  )
}

export default Signup
import React, { useState } from "react"
import Axios from "axios"
import Footer from "./footer"
import Navbar from "./navbar"
import "./App.css"

const Signup = () => {
  
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [dob, setdob] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")

  // const [name, setName] = useState("")

  // const addUser = () => {
  //   Axios.post("http://localhost:3001/create", {
  //     name: name
  //   })
  // }

  // Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/create", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      dob: dob,
      phoneNumber: phoneNumber
    }).then((response) => {
      console.log(response);
    });
  };

  
  return(
    <>
      <Navbar />

      <br />
      
      <div className="App">
        <div className="information">

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
        <button onClick={register}>Sign Up</button>

        </div>
      </div>

      {/* THIS IS WRAP WITH "form" COULDN'T WORK */}

      {/* <form>
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

        // Need to change the format here & db cause here is 
        "mm/dd/yyyy" while db is varchar

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
        <button onClick={register}>Sign Up</button>
      </form> */}


      {/* THIS IS FOR THE "test" TABLE */}

      {/* <div className="App">
        <div className="information">
          <label>Name:</label>
          <input 
            type="text"
            onChange={(event) => {setName(event.target.value)}}
          />

          <button onClick={addUser}>Add User</button>
        </div>
      </div> */}

      <Footer />
    </>
  )
}

export default Signup
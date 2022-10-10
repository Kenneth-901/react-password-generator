import React, { useState } from "react"
import Axios from "axios"
import Footer from "./footer"
import Navbar from "./navbar"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import YupPassword from 'yup-password'
import "yup-phone"
import "./App.css"


// Things to do
// Sign Up Page
// - First Name & Last Name error message
// - Check for no duplicate email in the db
// - Password change to hidden text with eye icon beside to change back to plain text
// - Confirm password field (make sure that both password & confirm password field is the same)
// - After sign up successful then auto redirect to log in page

const Signup = () => {
  YupPassword(Yup)
  
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    phoneNumber: ""
  };

  const onSubmit = (data) => {
    console.log(data);
    Axios.post("http://localhost:3001/create", data).then((response) => {
      console.log(response);
    });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This is a required field"),
    lastName: Yup.string().required("This is a required field"),
    email: Yup.string().email().required(),
    password: Yup.string().min(8, "Password is too short - should be 8 chars minimum.").password().required("No password provided."),
    dob: Yup.date().default(function () {
      return new Date();
    }),
    phoneNumber: Yup.string().phone("MY").required()
  });

  
  return(
    <>
      <Navbar />
      
      <div className="App">
        <div className="information">
          <Formik 
            initialValues = {initialValues}
            onSubmit={onSubmit} 
            validationSchema={validationSchema}>
            <Form>
              <Field
                id="FirstName"
                name="firstName"
                placeholder="First Name"
              />
              <ErrorMessage name="fName" component="span"/>
              <br />
              <Field
                id="LastName"
                name="lastName"
                placeholder="Last Name"
              />
              <ErrorMessage name="lName" component="span"/>
              <br />
              <Field 
                id="email" 
                name="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="span"/>
              <br />
              <Field 
                id="Password" 
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="span"/>
              <br />
              <Field 
                id="Dob" 
                name="dob"
                type="date"
                placeholder="DOB"
              />
              <br />
              <Field 
                id="PhoneNumber" 
                name="phoneNumber"
                placeholder="Phone Number"
              />
              <ErrorMessage name="phoneNumber" component="span"/>
              <br />
              <button type="submit">Sign Up</button> 
            </Form>
          </Formik>

        {/* Help me with this */}

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


  // const [firstName, setfirstName] = useState("")
  // const [lastName, setlastName] = useState("")
  // const [email, setemail] = useState("")
  // const [password, setpassword] = useState("")
  // const [dob, setdob] = useState("")
  // const [phoneNumber, setphoneNumber] = useState("")

  // const [name, setName] = useState("")

  // const addUser = () => {
  //   Axios.post("http://localhost:3001/create", {
  //     name: name
  //   })
  // }

  // Axios.defaults.withCredentials = true;

  // const register = () => {
  //   Axios.post("http://localhost:3001/create", {
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email,
  //     password: password,
  //     dob: dob,
  //     phoneNumber: phoneNumber
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };
import React, { useState } from "react"
import Axios from "axios"
import Footer from "./footer"
import Navbar from "./NavBar/navbar"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import YupPassword from 'yup-password'
import "yup-phone"
import "./App.css"
import { useNavigate } from "react-router-dom";
import PasswordShowAndHide from "./components/passwordShowAndHide";


// Things to do
// Sign Up Page
// "double confirm" placeholder

// Navbar (optional but much greatful)
// Able to change from "log in" -> "sign out" after logging in & refreshing the page
// Also able to change back from "sign out" -> "log in" after signing out & refreshing the page

const Signup = () => {
  YupPassword(Yup);
  const navigate = useNavigate();
  
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dPassword: "",
    dob: "",
    phoneNumber: ""
  };

  const onSubmit = (data) => {
    Axios.post("http://localhost:3001/create", data).then((response) => {
      console.log("success");
    });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required!"),
    lastName: Yup.string().required("Required!"),
    email: Yup.string().email().required("Email Required!").test('Unique Email', 'Email already in use', 
      function(value){
        return new Promise((resolve, reject) => {
          Axios.get(`http://localhost:3001/existed/${value}`).then((res) => {
            if (res.data.length > 0) {
              resolve(false);
            }else {
              resolve(true);
            }
          })
        })
    }),
    password: Yup.string().min(8, "Password is too short - should be 8 chars minimum.").password().required("No password provided."),
    dPassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    }),
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
            onSubmit={(v) => {
              onSubmit(v);
              navigate("/login.js");
            }} 
            validationSchema={validationSchema}
            render={({ errors, status, touched }) => (
              <Form className="test">
                <div className="form-group">
                  <Field
                    id="FirstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')}
                  />
                  <ErrorMessage name="firstName" component="span" className="invalid-feedback"/>
                </div>
                <div className="form-group">
                  <Field
                    id="LastName"
                    name="lastName"
                    placeholder="Last Name"
                  />
                  <ErrorMessage name="lastName" component="span" className="invalid-feedback"/>
                </div>
                <div className="form-group">
                  <Field 
                    id="email" 
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <ErrorMessage name="email" component="span"/>
                <div className="form-group">
                  <Field 
                    id="Password" 
                    name="password"
                    component={PasswordShowAndHide}
                  />
                  <ErrorMessage name="password" component="span"/>
                  <br />
                  <Field 
                    id="Password" 
                    name="dPassword"
                    type="password"
                    component={PasswordShowAndHide}
                    placeholder="Double Confirm Your Password"
                  />
                  <ErrorMessage name="dPassword" component="span"/>
                </div>
                <div className="form-group">
                  <Field 
                    id="Dob" 
                    name="dob"
                    type="date"
                    placeholder="DOB"
                  />
                </div>
                <div className="form-group">
                  <Field 
                    id="PhoneNumber" 
                    name="phoneNumber"
                    placeholder="Phone Number"
                  />
                  <ErrorMessage name="phoneNumber" component="span"/>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-2">Register</button>
                  <button type="reset" className="btn btn-secondary">Reset</button>
                </div>
              </Form>
            )}
          />

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
import React, { useEffect, useState } from "react"
import Footer from "./footerContainer"
import Navbar from "./NavBar/navbar"
import Axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import "yup-phone"
import { useNavigate, Link } from "react-router-dom";
import { AES }from 'crypto-js';
import "./styles/login.css"

const Login = () => {

  const [logInStatus, setlogInStatus] = useState("")
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true

  const initialValues = {
    email: "",
    password: ""
  };

  const logIn = (data) => {
    Axios.post("http://localhost:3001/login", data).then((response) => {
      if(!response.data.auth){
        setlogInStatus(response.data.message)
      }else{
        const envryptedString = AES.encrypt(response.data.result.Email,'MYKEY4DEMO');
        setlogInStatus(response.data.result.First_Name)
        window.localStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("email", envryptedString.toString());
        sessionStorage.setItem("email2", response.data.result.Email)
        sessionStorage.setItem("userID", response.data.result.userID)
        navigate("/");
      }
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This is a required field"),
    password: Yup.string().required("This is a required field"),
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if(response.data.loggedIn === true){
        setlogInStatus(response.data.user[0].First_Name)
      }
    })
  }, [])

  return(
    <>
      <Navbar />

      <div className="App">
        <div className="information">
          <div className="test">
          <Formik 
            initialValues = {initialValues}
            onSubmit={logIn} 
            validationSchema={validationSchema}>
              <Form className="wrapper">
                <Field
                  id="Email"
                  name="email"
                  placeholder="Enter email"
                  
                />
                <ErrorMessage name="email" component="span" className="errorValidation2"/>

                <br />

                <Field
                  id="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
                <ErrorMessage name="password" component="span" className="errorValidation2"/>

                <br />

                <button className="login" type="submit">Log In</button> 

                <br />

                <Link to="/resetPass.js">Forget Password</Link>

              </Form>
          </Formik>

          </div>
        </div>
      </div>
    
      <h1>{logInStatus}</h1>

      <Footer />
    </>
  )
}

export default Login
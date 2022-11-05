import React, { useEffect, useState } from "react"
import Footer from "./footerContainer"
import Navbar from "./NavBar/navbar"
import Axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import "yup-phone"
import { useNavigate, Link } from "react-router-dom";
import { AES }from 'crypto-js';

const Login = () => {

  const [logInStatus, setlogInStatus] = useState("")
  const navigate = useNavigate();
  
  // const logIn = () => {
  //   Axios.post("http://localhost:3001/login", {
  //     email: vali_email,
  //     password: vali_pass,
  //   }).then((response) => {
  //     if(response.data.message){
  //       setLoginStatus(response.data.message)
  //     }else{
  //       setLoginStatus(response.data[0].First_Name)
  //     }
  //   });
  // };

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

      <br />

      <div className="App">
        <div className="information">
        <Formik 
          initialValues = {initialValues}
          onSubmit={logIn} 
          validationSchema={validationSchema}>
            <Form>
              <Field
                id="Email"
                name="email"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="span"/>

              <br />

              <Field
                id="Password"
                name="password"
                type="password"
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="span"/>

              <br />

              <button type="submit">Log In</button> &nbsp; &nbsp;

              <Link to="/resetPass.js">Forget Password</Link>

            </Form>
        </Formik>

        </div>
      </div>
    
      <h1>{logInStatus}</h1>

      <Footer />
    </>
  )
}

export default Login
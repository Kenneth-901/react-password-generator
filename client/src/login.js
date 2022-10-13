import React, { useEffect, useState } from "react"
import Footer from "./footer"
import Navbar from "./navbar"
import Axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import "yup-phone"

const Login = () => {
  
  // const [vali_email, setvaliemail] = useState("")
  // const [vali_pass, setvalipass] = useState("")
  const [auth, setauth] = useState(false);
  const [logInStatus, setlogInStatus] = useState("")

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
    // console.log(data)
    Axios.post("http://localhost:3001/login", data).then((response) => {
      // console.log(response)
      if(!response.data.auth){
        // console.log(response.data.message)
        setauth(false)
        setlogInStatus(response.data.message)
      }else{
        // console.log(response.data)
        localStorage.setItem("token", response.data.token)
        setauth(true)
        setlogInStatus(response.data.result.First_Name)
      }
      // console.log(response)
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This is a required field"),
    password: Yup.string().required("This is a required field"),
  });

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     console.log(response)
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].First_Name);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      // console.log(response)
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
              <button type="submit">Log In</button> 
            </Form>
          </Formik>

          {/* <input 
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

          <button onClick={logIn}>Log In</button> */}
        </div>
      </div>
    
      <h1>{logInStatus}</h1>

      <Footer />
    </>
  )
}

export default Login
import React, { useEffect, useState } from "react"
import Footer from "./footer"
import Navbar from "./NavBar/navbar"
import Axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import "yup-phone"
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  
  
  const [emailExist, setemailExist] = useState()
  // const [vali_pass, setvalipass] = useState("")
  // const [auth, setauth] = useState(false);
  // const [logInStatus, setlogInStatus] = useState("")
  // const navigate = useNavigate();
  
  const initialValues = {
    email: "",
    // password: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email Required!").test('Unique Email', "Email doesn't exist", 
      function(value){
        return new Promise((resolve, reject) => {
          Axios.get(`http://localhost:3001/existed/${value}`).then((res) => {console.log(res)
            if (res.data.length > 0) {
              resolve(true);
              setemailExist(true)
            }else {
              resolve(false);
              setemailExist(false)
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
    // password: Yup.string().required("This is a required field"),
  });
  
  const checkUser = (data) => {
    // console.log(data)
    
    Axios.post("http://localhost:3001/resetPass", data).then((response) => {
      
    });
  };

  // const checkUser = (data) => {
  //   // console.log(data)
  //   Axios.post("http://localhost:3001/login", data).then((response) => {
  //     // console.log(response)
  //     if(!response.data.auth){
  //       // console.log(response.data.message)
  //       setauth(false)
  //       setlogInStatus(response.data.message)
  //     }else{
  //       const envryptedString = AES.encrypt(response.data.result.Email,'MYKEY4DEMO');
  //       // console.log(response.data)
  //       localStorage.setItem("token", response.data.token)
  //       setauth(true)
  //       setlogInStatus(response.data.result.First_Name)
  //       window.localStorage.setItem("isLoggedIn", true);
  //       sessionStorage.setItem("email", envryptedString.toString());
  //       navigate("/");
  //     }
  //     // console.log(response)
  //   });
  // };

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     console.log(response)
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].First_Name);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     // console.log(response)
  //     if(response.data.loggedIn === true){
  //       setlogInStatus(response.data.user[0].First_Name)
  //     }
  //   })
  // }, [])

  return(
    <>
      <Navbar />

      <br />

      <div className="App">
        <div className="information">
          <Formik 
            initialValues = {initialValues}
            onSubmit={checkUser} 
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
                id="seed"
                name="seed"
                placeholder="Enter phase"
              />

              <br />

              <Field
                id="seed"
                name="seed"
                placeholder="Enter phase"
              />

              <br />


              <button type="submit">Next</button> 

              <p>{}</p>
            </Form>
          </Formik>

          {/* <Formik 
            initialValues = {initialValues}
            onSubmit={checkUser} 
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
          </Formik> */}
        </div>
      </div>
    
      <Footer />
    </>
  )
}

export default ResetPass
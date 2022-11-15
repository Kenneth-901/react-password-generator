import React, { useState, useEffect } from "react"
import Axios from "axios"
import Footer from "./footerContainer"
import Navbar from "./NavBar/navbar"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import YupPassword from 'yup-password'
import "yup-phone"
import "./App.css"
import { useNavigate } from "react-router-dom";
import { AES, enc }from 'crypto-js';
import Button from "./components/button"
import { toast } from "./common/toast"


const ContactForm = () => {
  YupPassword(Yup);
  const navigate = useNavigate();
  const isloggedIn = window.localStorage.getItem("isLoggedIn");
  const userID = sessionStorage.getItem("userID")
  const UserEmail = sessionStorage.getItem("email2")
  
  const initialValue = {
    fullName: "",
    email: "",
    message: ""
  };

  const initialValues = {
    fullName: "",
    email: UserEmail,
    message: ""
  };

  const onSubmit = (data) => {
    console.log(data);
    const apiValue = {
      id: userID || "",
      fullName: data.fullName,
      email: data.email,
      message: data.message
    };
    console.log(apiValue);
    try {
      Axios.post("http://localhost:3001/submitForm", apiValue).then((response) => {
        // console.log(response);
      });
      toast.success("success");
    } catch(e) {
      toast.error(e);
    }
    
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Required!"),
    // email: Yup.string().email().required("Email Required!").test('Unique Email', 'Email already in use', 
    //   function(value){
    //     return new Promise((resolve, reject) => {
    //       Axios.get(`http://localhost:3001/existed/${value}`).then((res) => {
    //         if (res.data.length > 0) {
    //           resolve(false);
    //         }else {
    //           resolve(true);
    //         }
    //       })
    //     })
    // }),
    email: Yup.string().required("Required!"),
    message: Yup.string()
  });

  return(
    <>
      <Navbar />
      
      <div className="App">
        <div className="test">
          <Formik 
            initialValues = {isloggedIn ? initialValues : initialValue}
            onSubmit={(v) => {
              onSubmit(v);
              navigate("/");
            }} 
            validationSchema={validationSchema}
            render={({ errors, status, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>

                <h1>Contact Us</h1>

                <Field
                  id="FullName"
                  name="fullName"
                  type="text"
                  placeholder="Address You"
                />
                <ErrorMessage name="fullName" component="span" className="errorValidation2"/>

                <Field 
                  id="email" 
                  name="email"
                  placeholder="Email"
                  readOnly={isloggedIn ? true : false}
                />
                <ErrorMessage name="email" component="span" className="errorValidation2"/>

                <textarea
                  id="Message"
                  name="message"
                  placeholder="Feedback"
                  rows="4" 
                  cols="50"
                />
                <ErrorMessage name="message" component="span" className="errorValidation2" />

                <br />

                <Button onClick={handleSubmit}>Register</Button>
                
              </Form>
            )}
          />

        </div>
      </div>

      <Footer />
    </>
  )
}

export default ContactForm
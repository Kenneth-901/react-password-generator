import React from "react"
import Axios from "axios"
import Footer from "./footerContainer"
import Navbar from "./NavBar/navbar"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import YupPassword from 'yup-password'
import "yup-phone"
import "./App.css"
import { useNavigate } from "react-router-dom";
import Button from "./components/button"
import { toast } from "./common/toast"


const ContactForm = () => {
  YupPassword(Yup);
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
    email: "",
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
      toast.success("Your message has been captured");
    } catch(e) {
      toast.error(e);
    }
    
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email address"),
    message: Yup.string().required("Please enter message")
  });

  return(
    <>
      <Navbar />
      
      <div className="App">
        <div className="test">
          <Formik 
            initialValues = {initialValue}
            onSubmit={(v) => {
              onSubmit(v);
            }} 
            validationSchema={validationSchema}
            render={({ errors, status, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>

                <h1>Contact Us</h1>

                <Field
                  id="FullName"
                  name="fullName"
                  type="text"
                  placeholder="Name"
                />
                <ErrorMessage name="fullName" component="span" className="errorValidation2"/>

                <Field 
                  id="email" 
                  name="email"
                  placeholder="Email"
                  // readOnly={isloggedIn ? true : false}
                />
                <ErrorMessage name="email" component="span" className="errorValidation2"/>
                
                <br /><br />

                <Field
                  id="Message"
                  name="message"
                  placeholder="Feedback"
                  as="textarea"
                  rows="4" 
                  cols="52"
                  className="contactForm"
                />
                <ErrorMessage name="message" component="span" className="errorValidation2" />

                <br />

                <Button onClick={handleSubmit}>Submit</Button>
                
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
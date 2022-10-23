import React, { useEffect, useState } from "react"
import Navbar from "./NavBar/navbar"
import Footer from "./footer"
import Axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const GenPassword = () => {
  
  const [genPass, setgenPass] = useState("")
  const [toValidate, settoValidate] = useState()

  const authenticate = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then((response) => {
      // console.log(response)
      // console.log(response.data.auth)
      if(response.data.auth){
        setgenPass("Success")
      }else{
        setgenPass("fail")
      }
    })
  }

  const vali = (data) => {
    Axios.post("http://localhost:3001/validateUser", data).then((response) => {
      console.log(response)
    })
  }

  const initialValues = {
    password: ""
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("This is a required field"),
  });

  const check = () => {
    settoValidate(
      <Formik 
          initialValues = {initialValues}
          onSubmit={vali} 
          validationSchema={validationSchema}>
          <Form>
            <Field
              id="Password"
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <ErrorMessage name="password" component="span"/>
            <br />
            <button type="submit">View my passwords</button> 
          </Form>
        </Formik>
    )
  }
  
  return(
    <>
      <Navbar />

      <button onClick={check}>Auth</button>
      {toValidate}

      <button onClick={authenticate}>View Password</button>
      <p>{genPass}</p>
      {/* Here to display all the Generated Password by the user */}
    
      <Footer /> 
    </>
  )
}

export default GenPassword
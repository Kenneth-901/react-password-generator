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
import PasswordShowAndHide from "./components/passwordShowAndHide";
import ConfirmPasswordShowAndHide from "./components/ConfrimPasswordShowAndHide";
import FormikDropDownList from "./form/formikDropDownList"
import Button from "./components/button"
import { toast } from "./common/toast"


const Signup = () => {
  YupPassword(Yup);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dPassword: "",
    dob: "",
    phoneNumber: "",
    phaseQuestion: "",
    phaseAnswer: "",
    phaseQuestion1: "",
    phaseAnswer1: ""
  };

  const onSubmit = (data) => {
    try {
      Axios.post("http://localhost:3001/create", data).then((response) => {
        console.log("success");
      });
      toast.success("success");
    } catch(e) {
      toast.error(e);
    }
    
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
    dPassword: Yup.string().required("Required").when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    }),
    dob: Yup.date().required("DOB required").default(function () {
      return new Date();
    }),
    phoneNumber: Yup.string().phone().required(),
    phaseQuestion: Yup.mixed(),
    phaseAnswer: Yup.string().required("Required!"),
    phaseQuestion1: Yup.mixed(),
    phaseAnswer1: Yup.string().required("Required!")
  });

  useEffect(() => {
    Axios.get(`http://localhost:3001/phaseQuestion`).then(resp => {
      setItem(resp.data);
    });
  }, [])

  const phaseQuestionList = React.useMemo(() => {
    if (!item.length) return [];

    const mappedList = item.map(list => ({
      value: `${list.questionsID}`,
      label: `${list.question}`,
    }));

    return mappedList;
  }, [item]);

  return(
    <>
      <Navbar />
      
      <div className="App">
        <div className="test">
          <Formik 
            initialValues = {initialValues}
            onSubmit={(v) => {
              onSubmit(v);
              navigate("/login.js");
            }} 
            validationSchema={validationSchema}
            render={({ errors, status, touched, handleSubmit }) => (
              <Form className="wrapper" onSubmit={handleSubmit}>

                <Field
                  id="FirstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />
                <ErrorMessage name="firstName" component="span" className="validation"/>


                <Field
                  id="LastName"
                  name="lastName"
                  placeholder="Last Name"
                />
                <ErrorMessage name="lastName" component="span" className="validation"/>


                <Field 
                  id="email" 
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="span" className="validation"/>


                <Field 
                  id="Password" 
                  name="password"
                  component={PasswordShowAndHide}
                />
                <ErrorMessage name="password" component="span" className="specialValidation"/>

                
                <Field 
                  id="Password" 
                  name="dPassword"
                  type="password"
                  component={ConfirmPasswordShowAndHide}
                  placeholder="Repeat Password"
                />
                <ErrorMessage name="dPassword" component="span" className="specialValidation"/>


                <Field 
                  id="Dob" 
                  name="dob"
                  type="date"
                  placeholder="DOB"
                />
                <ErrorMessage name="dob" component="span" className="specialValidation "/>

                <Field 
                  id="PhoneNumber" 
                  name="phoneNumber"
                  placeholder="Phone Number"
                />
                <ErrorMessage name="phoneNumber" component="span" className="specialValidation "/>


                <FormikDropDownList 
                  id="PhaseQuestion" 
                  name="phaseQuestion"
                  values={phaseQuestionList}
                  placeholder="Select"
                />
                <ErrorMessage name="phaseQuestion" component="span" className="validation"/>

                <Field
                  id="PhaseAnswer"
                  name="phaseAnswer"
                  placeholder="Phase Answer"
                />
                <ErrorMessage name="phaseAnswer" component="span" className="validation"/>


                <FormikDropDownList 
                  id="PhaseQuestion1" 
                  name="phaseQuestion1"
                  values={phaseQuestionList}
                  placeholder="Select"
                />
                <ErrorMessage name="phaseQuestion1" component="span" className="validation"/>

                <Field
                  id="PhaseAnswer1"
                  name="phaseAnswer1"
                  placeholder="Phase Answer"
                />
                <ErrorMessage name="phaseAnswer1" component="span" className="validation" />

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

export default Signup
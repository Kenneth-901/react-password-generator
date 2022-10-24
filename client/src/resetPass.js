import React, { useEffect, useMemo, useState } from "react"
import Footer from "./footer"
import Navbar from "./NavBar/navbar"
import Axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import YupPassword from 'yup-password'
import "yup-phone"
import PasswordShowAndHide from "./components/passwordShowAndHide";
import ConfirmPasswordShowAndHide from "./components/ConfrimPasswordShowAndHide";
import FormikDropDownList from "./form/formikDropDownList"
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  
  YupPassword(Yup);
  const navigate = useNavigate();
  const [emailExist, setemailExist] = useState()
  const [getEmail, setgetEmail] = useState("")
  const [item, setItem] = useState([]);
  const [correctPhase, setcorrectPhase] = useState()
  
  const initialValues = {
    email: "",
    phaseQuestion: "",
    phaseAnswer: "",
    password: "",
    dPassword: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email Required!").test('Unique Email', "Email doesn't exist", 
      function(value){
        return new Promise((resolve, reject) => {
          Axios.get(`http://localhost:3001/existed/${value}`).then((res) => {
            if (res.data.length > 0) {
              resolve(true);
              setemailExist(true)
              setgetEmail(value)
            }else {
              resolve(false);
              setemailExist(false)
            }
          })
        })
      }), 
    phaseQuestion: Yup.mixed(),
    phaseAnswer: Yup.string().required("Please enter your phase").test('Unique Phase', "Incorrect Answer",
      function(avalue){
        return new Promise((resolve, reject) => {
          const data = {
            email: getEmail,
            questionNumber: this.parent.phaseQuestion.value,
            phaseAnswer: avalue
          }

          Axios.post("http://localhost:3001/comparedPhaseAnswer", data).then((response) => {
            if(response.data.length > 0){
              resolve(true)
              setcorrectPhase(true)
            }else{
              resolve(false)
              setcorrectPhase(false)
            }
          })
        })
      }),
    password: Yup.string().min(8, "Password is too short - should be 8 chars minimum.").password().required("No password provided."),
    dPassword: Yup.string().required("Re-enter your password").when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    }),
  });
  
  const phaseQuestionList = React.useMemo(() => {
    if (!item.length) return [];

    const mappedList = item.map(list => ({
      value: `${list.questionsID}`,
      label: `${list.question}`,
    }));

    return mappedList;
  }, [item]);

  const checkUser = (data) => {
    Axios.post("http://localhost:3001/resetPassword", data).then((response) => {
      if(response){
        navigate("/login.js");
      }
    })
  }

  useMemo(() => {
    Axios.get(`http://localhost:3001/selectedPhaseQuestion/${getEmail}`).then(resp => { setItem(resp.data); }); 
  }, [getEmail])


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

              <br /><br />

              {emailExist && 
                <>
                  <FormikDropDownList 
                    id="PhaseQuestion" 
                    name="phaseQuestion"
                    values={phaseQuestionList}
                    placeholder="Select"
                    className={"input100"}
                  />
                  <ErrorMessage name="phaseQuestion" component="span"/>
                  
                  <br />

                  <Field
                    id="PhaseAnswer"
                    name="phaseAnswer"
                    placeholder="Phase Answer"
                    className={"input100"}
                  />
                  <ErrorMessage name="phaseAnswer" component="span" className="invalid-feedback"/>

                  <br />
                </>
              }

              {correctPhase &&
                <>
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
                    component={ConfirmPasswordShowAndHide}
                    placeholder="Double Confirm Your Password"
                  />
                  <ErrorMessage name="dPassword" component="span"/>
                </>
              }
                
              <button type="submit">Next</button> 

            </Form>
          </Formik>
        </div>
      </div>
    
      <Footer />
    </>
  )
}

export default ResetPass
import React, { useState, useEffect } from "react"
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
import ConfirmPasswordShowAndHide from "./components/ConfrimPasswordShowAndHide";
import FormikDropDownList from "./form/formikDropDownList"
import Button from "./components/button"
import { toast } from "./common/toast"


// Things to do
// Sign Up Page
// "double confirm" placeholder

// Navbar (optional but much greatful)
// Able to change from "log in" -> "sign out" after logging in & refreshing the page
// Also able to change back from "sign out" -> "log in" after signing out & refreshing the page

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
    phoneNumber: Yup.string().phone("MY").required(),
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
              <Form className="" onSubmit={handleSubmit}>
                <div className="form-group">
                  <Field
                    id="FirstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className={"input100"}
                  />
                  <ErrorMessage name="firstName" component="span"/>
                </div>
                <div className="form-group">
                  <Field
                    id="LastName"
                    name="lastName"
                    placeholder="Last Name"
                    className={"input100"}
                  />
                  <ErrorMessage name="lastName" component="span"/>
                </div>
                <div className="form-group">
                  <Field 
                    id="email" 
                    name="email"
                    placeholder="Email"
                    className={"input100"}
                  />
                  <ErrorMessage name="email" component="span"/>
                </div>
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
                    component={ConfirmPasswordShowAndHide}
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
                    className={"input100"}
                  />
                </div>
                <div className="form-group">
                  <Field 
                    id="PhoneNumber" 
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className={"input100"}
                  />
                  <ErrorMessage name="phoneNumber" component="span"/>
                </div>
                <div className="form-group">
                  <FormikDropDownList 
                    id="PhaseQuestion" 
                    name="phaseQuestion"
                    values={phaseQuestionList}
                    placeholder="Select"
                    className={"input100"}
                  />
                  <ErrorMessage name="phaseQuestion" component="span"/>
                  <Field
                    id="PhaseAnswer"
                    name="phaseAnswer"
                    placeholder="Phase Answer"
                    className={"input100"}
                  />
                  <ErrorMessage name="phaseAnswer" component="span"/>
                </div>
                <div className="form-group">
                  <FormikDropDownList 
                    id="PhaseQuestion1" 
                    name="phaseQuestion1"
                    values={phaseQuestionList}
                    placeholder="Select"
                    className={"input100"}
                  />
                  <ErrorMessage name="phaseQuestion1" component="span"/>
                  <Field
                    id="PhaseAnswer1"
                    name="phaseAnswer1"
                    placeholder="Phase Answer"
                    className={"input100"}
                  />
                  <ErrorMessage name="phaseAnswer1" component="span" className="invalid-feedback"/>
                </div>
                <div className="form-group">
                  <Button onClick={handleSubmit}>Register</Button>
                  <button type="reset">Reset</button>
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
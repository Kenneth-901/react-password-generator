import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from 'yup-password';
import "yup-phone";
import Axios from "axios";
import { AES, enc }from 'crypto-js';
import PasswordShowAndHide from "./components/passwordShowAndHide";

const SignOut = () => {
  YupPassword(Yup);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const decrypted = AES.decrypt(window.sessionStorage.getItem("email"), 'MYKEY4DEMO');
  const loggedEmail = decrypted.toString(enc.Utf8);

  const id = item.map(a => a.userID);

  const initialValues = {
    firstName: "",
    lastName: "",
    password: "",
    dPassword: "",
    dob: "",
    phoneNumber: ""
  };

  const onSubmit = (data) => {
    const apiValue = {
      id: id.toString(),
      data: data
    };
    Axios.post("http://localhost:3001/updateProfile", apiValue).then((response) => {
      console.log("success");
    });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required!"),
    lastName: Yup.string().required("Required!"),
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
    phoneNumber: Yup.string().phone("MY").required()
  });

  useEffect(() => {
    Axios.get(`http://localhost:3001/account/${loggedEmail}`).then(resp => {
      setItem(resp.data);
    });
  }, [])

  return(
    <div className="App">
      <div>
        <Formik 
          initialValues = {initialValues}
          onSubmit={(v) => {
            onSubmit(v);
            navigate("/account");
          }} 
          validationSchema={validationSchema}
          render={({ errors, status, touched }) => (
            <Form className="test">
              <div className="form-group">
                <Field
                  id="FirstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')}
                />
                <ErrorMessage name="firstName" component="span" className="invalid-feedback"/>
              </div>
              <div className="form-group">
                <Field
                  id="LastName"
                  name="lastName"
                  placeholder="Last Name"
                />
                <ErrorMessage name="lastName" component="span" className="invalid-feedback"/>
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
                  component={PasswordShowAndHide}
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
                />
              </div>
              <div className="form-group">
                <Field 
                  id="PhoneNumber" 
                  name="phoneNumber"
                  placeholder="Phone Number"
                />
                <ErrorMessage name="phoneNumber" component="span"/>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">Update</button>
                <button type="reset" className="btn btn-secondary">Reset</button> 
              </div>
            </Form>
          )}
        />
        <Link to="/account">Back</Link>
      </div>
    </div>
  )
}

export default SignOut
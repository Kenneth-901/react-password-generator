import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from 'yup-password';
import "yup-phone";
import Axios from "axios";
import { AES, enc }from 'crypto-js';
import PasswordShowAndHide from "./components/passwordShowAndHide";
import ConfirmPasswordShowAndHide from "./components/ConfrimPasswordShowAndHide";
import ViewEditToggle from "./components/viewEditToggle";
import InlineDetails from "./components/inlineDetails";
import { toast } from "./common/toast"

const UpdateProfile = () => {
  YupPassword(Yup);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [editName, setEditName] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [editDob, setEditDob] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const decrypted = AES.decrypt(window.sessionStorage.getItem("email"), 'MYKEY4DEMO');
  const loggedEmail = decrypted.toString(enc.Utf8);

  const id = item.map(a => a.userID);

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const onSubmit = async (data) => {
    // console.log(data);
    const apiValue = {
      id: id.toString(),
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      password: data.password || "",
      dob: data.dob || "",
      phoneNumber: data.phoneNumber || ""
    };

    try {
      Axios.post("http://localhost:3001/updateProfile", apiValue).then((response) => {
        console.log(response);
      });
      toast.success("Success");
      await sleep(1500);
      window.location.reload()
    } catch(e) {
      toast.error(e);
    }
  };

  const validationName = Yup.object().shape({
    firstName: Yup.string().required("Required!"),
    lastName: Yup.string().required("Required!")
  });

  const validationPassword = Yup.object().shape({
    password: Yup.string().min(8, "Password is too short - should be 8 chars minimum.").password().required("No password provided."),
    dPassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    })
  });

  const validationDateOfBirth = Yup.object().shape({
    dob: Yup.date().default(function () {
      return new Date();
    })
  });

  const validationPhoneNumber = Yup.object().shape({
    phoneNumber: Yup.string().phone('MY', true, 'Only Malaysia Number').required(),
  });

  useEffect(() => {
    Axios.get(`http://localhost:3001/account/${loggedEmail}`).then(resp => {
      setItem(resp.data);
    });
  }, [loggedEmail]);

  return(
    <div className="App">
      <Link to="/account" style={{marginTop: "2rem"}}>{"<"} Back</Link>

      
      <div className="test" style={{borderRadius: "20px"}}>
        <div className="profile-header">
          <div className="profile-title">
            Personal Details
            {editName === false && <button className="profile-btn" onClick={() => setEditName(true)}>Edit Profile</button>}
          </div>
        </div>
        <Formik
          initialValues = {{
            firstName: "",
            lastName: ""
          }}
          onSubmit={(v) => {
            onSubmit(v);
            setEditName(false);
          }} 
          validationSchema={validationName}
          render={({ handleSubmit }) => (
            <>
              <div className="profile-body">
                <ViewEditToggle
                  isEditMode={editName}
                  renderView={(
                    <>
                      {item.length > 0 && item.map(a => (
                        <div key={a.userID} className="d-flex flex-column lh-24">
                          <div className="">
                            <InlineDetails
                              title={"Full Name: "}
                              label={`${a.First_Name} ${a.Last_Name}`}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  renderEdit={(
                    <>
                      <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <Field
                            id="FirstName"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                          <ErrorMessage name="firstName" component="span" className="updateValidation"/>

                        </div>
                        <div className="form-group">
                          <Field
                            id="LastName"
                            name="lastName"
                            placeholder="Last Name"
                          />
                          <ErrorMessage name="lastName" component="span"className="updateValidation"/>
                        </div>

                        <div className="wrapUpdateButton">
                          <button onClick={handleSubmit} className="updateButton">Update</button>
                          <button onClick={() => setEditName(false)} className="updateButtonSecondary">Cancel</button> 
                        </div>

                      </Form>
                    </>
                  )}
                />
              </div>
            </>
          )}
        />
      </div>

      <div className="test" style={{borderRadius: "20px"}}>
        <div className="profile-header">
          <div className="profile-title">
            Personal Details Password
            {editPass === false && <button className="profile-btn" onClick={() => setEditPass(true)}>Edit Password</button>}
          </div>
        </div>
        <Formik
          initialValues = {{
            password: "",
            dPassword: ""
          }}
          onSubmit={(v) => {
            onSubmit(v);
            setEditPass(false);
          }} 
          validationSchema={validationPassword}
          render={({ handleSubmit }) => (
            <>
              <div className="profile-body">
                <ViewEditToggle
                  isEditMode={editPass}
                  renderView={(
                    <>
                      {item.length > 0 && item.map(a => (
                        <div key={a.userID} className="d-flex flex-column lh-24">
                          <div className="">
                            <InlineDetails
                              title={"Password: "}
                              label={`***********`}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  renderEdit={(
                    <>
                      <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <Field 
                            id="Password" 
                            name="password"
                            component={PasswordShowAndHide}
                          />
                          <ErrorMessage name="password" component="span" className="updateValidation"/>
                          <br />
                          <Field 
                            id="Password" 
                            name="dPassword"
                            type="password"
                            component={ConfirmPasswordShowAndHide}
                            placeholder="Double Confirm Your Password"
                          />
                          <ErrorMessage name="dPassword" component="span" className="updateValidation"/>
                        </div>
                        <div className="wrapUpdateButton">
                          <button onClick={handleSubmit} className="updateButton">Update</button>
                          <button onClick={() => setEditPass(false)} className="updateButtonSecondary">Cancel</button> 
                        </div>
                      </Form>
                    </>
                  )}
                />
              </div>
            </>
          )}
        />
      </div>

      <div className="test" style={{borderRadius: "20px"}}>
        <div className="profile-header">
          <div className="profile-title">
            Date Of Birth
            {editDob === false && <button className="profile-btn" onClick={() => setEditDob(true)}>Edit DOB</button>}
          </div>
        </div>
        <Formik
          initialValues = {{
            dob: ""
          }}
          onSubmit={(v) => {
            onSubmit(v);
            setEditDob(false);
          }} 
          validationSchema={validationDateOfBirth}
          render={({ handleSubmit }) => (
            <>
              <div className="profile-body">
                <ViewEditToggle
                  isEditMode={editDob}
                  renderView={(
                    <>
                      {item.length > 0 && item.map(a => (
                        <div key={a.userID} className="d-flex flex-column lh-24">
                          <div className="">
                            <InlineDetails
                              title={"Date Of Birth: "}
                              label={`${a.DOB}`}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  renderEdit={(
                    <>
                      <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <Field 
                            id="Dob" 
                            name="dob"
                            type="date"
                            placeholder="DOB"
                          />
                        </div>
                        <div className="wrapUpdateButton">
                          <button onClick={handleSubmit} className="updateButton">Update</button>
                          <button onClick={() => setEditDob(false)} className="updateButtonSecondary">Cancel</button> 
                        </div>
                      </Form>
                    </>
                  )}
                />
              </div>
            </>
          )}
        />
      </div>

      <div className="test" style={{borderRadius: "20px"}}>
        <div className="profile-header">
          <div className="profile-title">
            Phone Number
            {editPhoneNumber === false && <button className="profile-btn" onClick={() => setEditPhoneNumber(true)}>Edit PNumber</button>}
          </div>
        </div>
        <Formik
          initialValues = {{
            dob: ""
          }}
          onSubmit={(v) => {
            onSubmit(v);
            setEditPhoneNumber(false);
          }} 
          validationSchema={validationPhoneNumber}
          render={({ handleSubmit }) => (
            <>
              <div className="profile-body">
                <ViewEditToggle
                  isEditMode={editPhoneNumber}
                  renderView={(
                    <>
                      {item.length > 0 && item.map(a => (
                        <div key={a.userID} className="d-flex flex-column lh-24">
                          <div className="">
                            <InlineDetails
                              title={"Phone Number: "}
                              label={`${a.Phone_Number}`}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  renderEdit={(
                    <>
                      <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <Field 
                            id="PhoneNumber" 
                            name="phoneNumber"
                            placeholder="Phone Number"
                          />
                          <ErrorMessage name="phoneNumber" component="span" className="updateValidation" style={{width: "65%"}}/>
                        </div>
                        <div className="wrapUpdateButton">
                          <button onClick={handleSubmit} className="updateButton">Update</button>
                          <button onClick={() => setEditPhoneNumber(false)} className="updateButtonSecondary">Cancel</button> 
                        </div>
                      </Form>
                    </>
                  )}
                />
              </div>
            </>
          )}
        />
      </div>

      <Link to="/account" style={{marginBottom: "2rem"}}>{"<"} Back</Link>
    </div>
  )
}

export default UpdateProfile;


/* 
  Email Field
  <div className="profile">
    <div className="profile-header">
      <div className="profile-title">
        Email
        <button className="profile-btn" onClick={() => setEditEmail(true)}>Edit Email</button> 
        </div>
        </div>
        <Formik
          initialValues = {{
            email: ""
          }}
          onSubmit={(v) => {
            onSubmit(v);
          }} 
          // validationSchema={validationSchema}
          render={({ handleSubmit }) => (
            <>
              <div className="profile-body">
                <ViewEditToggle
                  isEditMode={false}
                  renderView={(
                    <>
                      {item.length > 0 && item.map(a => (
                        <div key={a.userID} className="d-flex flex-column lh-24">
                          <div className="">
                            <InlineDetails
                              title={"Email: "}
                              label={`${a.Email}`}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                />
              </div>
            </>
          )}
        />
      </div>
    
*/
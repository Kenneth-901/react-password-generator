import * as React from 'react';
import PropTypes from 'prop-types';
import Modal from './components/modal';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import Button from './components/button';
import { toast } from "./common/toast"
import "./styles/updateProfile.css"
// import "./styles/login.css"

  const UpdateProfileComfirmModal = ({
    isOpen, onClose, onClickYes, isLoading, data
  }) => {
    const email = data.map(a => a.Email);
    const navigate = useNavigate();
    const initialValues = {
        email: email.toString(),
        password: "",
    };

    const onSubmit = (data) => {
    };

    const validationSchema = Yup.object().shape({
      password: Yup.string().required("No password provided.").test('Unique Password', 'Wrong Password', 
      function(value){
          return new Promise((resolve, reject) => {
              const apiValue = {
                email: email,
                password: value
              }
              Axios.post(`http://localhost:3001/updateConfirmation`, apiValue).then((res) => {
                  if (res.data.message === "Success") {
                      resolve(true);
                  }else {
                      resolve(false);
                  }
              })
          })
      }),
    });

    return (
      <Modal
        isOpen={isOpen}
        onClick={onClose}
        title={"Please Enter Your Password"}
        styleMode="small"
        overlayClassName="front"
      >
        <div className="wrapper">
          <Formik 
            initialValues = {initialValues}
            onSubmit={(v) => {
              onSubmit(v);
              navigate("/updateProfile");
            }} 
            validationSchema={validationSchema}
            render={({ handleSubmit, errors, status, touched }) => (
              <>
                <Form onSubmit={handleSubmit} className="wrapUpdate">
                  
                    <Field
                      id="Email"
                      name="email"
                      readOnly
                      className="updateInput"
                    />
                  
                    <Field
                      id="Password"
                      name="password"
                      type="password"
                      placeholder="Enter Your Password"
                      className="updateInput"
                    />

                    <ErrorMessage name="password" component="span" className='updateValidation'/>

                </Form>

                <div className="wrapUpdateButton">
                  
                  <button onClick={handleSubmit} className="updateButton">Yes</button>

                  <button type="button" onClick={onClose} className="updateButtonSecondary">Cancel</button>
                  
                </div>
                
              </>
            )}
          />
        </div>
      </Modal>
    )};

UpdateProfileComfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onClickYes: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default UpdateProfileComfirmModal;

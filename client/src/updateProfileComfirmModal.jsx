import * as React from 'react';
import PropTypes from 'prop-types';
import Modal from './components/modal';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Axios from "axios"
import { useNavigate } from "react-router-dom";

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
    // Axios.post("http://localhost:3001/updateConfirmation", data).then((response) => {
    //     console.log(response);
    // });
};

const validationSchema = Yup.object().shape({
    password: Yup.string().required("No password provided.").test('Unique Password', 'Wrong Password', 
    function(value){
        return new Promise((resolve, reject) => {
            Axios.get(`http://localhost:3001/updateConfirmation/${email.toString()}/${value}`).then((res) => {
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
    <div className="App">
      <Formik 
            initialValues = {initialValues}
            onSubmit={(v) => {
              onSubmit(v);
              navigate("/updateProfile");
            }} 
            validationSchema={validationSchema}
            render={({ errors, status, touched }) => (
              <Form>
                <div className="form-group">
                  <Field
                    id="Email"
                    name="email"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <Field
                    id="Password"
                    name="password"
                    type="password"
                    placeholder="Enter Your Password"
                  />
                  <ErrorMessage name="password" component="span" className="invalid-feedback"/>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="button" onClick={onClose} className="no-decoration-btn text-gray fs-standard mr-4">
                        {"Cancel"}
                    </button>
                    <button type="submit" className="btn btn-brand">Yes</button>
                </div>
              </Form>
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

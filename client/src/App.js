import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/modal.scss";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import HomePage from "./homePage";
import Login from "./login";
import Signup from "./signup";
import Account from "./account";
import GenPassword from "./genPassword";
import SignOut from "./signout";
import UpdateProfile from "./updateProfile"
import ResetPass from "./resetPass";
import { ToastContainer } from 'react-toastify';

const App = () => {
  
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login.js" element={<Login />} />
          <Route path="/signout.js" element={<SignOut />} />
          <Route path="/signup.js" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/genPassword.js" element={<GenPassword />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/resetPass.js" element={<ResetPass />}/>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      
    </>
  )
}

export default App;

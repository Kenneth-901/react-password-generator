import React, { useEffect, useState } from "react"
import Navbar from "./NavBar/navbar"
import Footer from "./footer"
import Axios from "axios"
// import { Link, Redirect } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardButton from "./components/cardButton";
import InlineDetails from "./components/inlineDetails";
// import { toDate } from 'date-fns'
import {AES, enc}from 'crypto-js';
import UpdateProfileComfirmModal from "./updateProfileComfirmModal";

const Account = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [passwordType, setPasswordType] = useState(false);
  const [updateConfirm, setUpdateConfirm] = useState(false);
  // const bool = window.localStorage.getItem("isLoggedIn");
  const decrypted = AES.decrypt(window.sessionStorage.getItem("email"), 'MYKEY4DEMO');
  const loggedEmail = decrypted.toString(enc.Utf8);
  const fetchUser = async () => {
    await Axios.get(`http://localhost:3001/account/${loggedEmail}`).then(resp => {
      setItem(resp.data);
    });
  };

  const togglePassword = () =>{
    if(passwordType === false) {
      setPasswordType(true);
    } else {
      setPasswordType(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return(
    <>
      <UpdateProfileComfirmModal
        isOpen={updateConfirm}
        data={item}
        onClose={() => setUpdateConfirm(false)}
      />
      <Navbar />
      {/* navigate("/updateProfile") */}
      {/* Help me with this */}
      {/* Here to display all the account info */}
      <div className="App">
      {item.length > 0 && item.map(a => (
        <>
          <CardButton
          title={`${a.First_Name.toUpperCase()} Profile`}
          onClick={() => setUpdateConfirm(true)}
          renderBody={() => (
            <div key={a.userID} className="d-flex flex-column lh-24">
              <div className="d-flex flex-row justify-content-between mb-2">
                <InlineDetails
                  title={"Full Name: "}
                  label={`${a.First_Name} ${a.Last_Name}`}
                />
                <InlineDetails
                  title={"Email: "}
                  label={a.Email}
                />
                <InlineDetails
                  title={"Date Of Birth: "}
                  label={a.DOB}
                />
              </div>
            </div>
          )}
        />
        </>
      ))}
        
        {/* <div className="card">
          <div className="upper-container">
            <div className="image-container"></div>
          </div>
          <div className="lower-container">
            {item.length > 0 && item.map(a => (
              <div key={a.userID}>
                <h3>{a.First_Name}</h3>
                <h2>{a.First_Name} + {a.Last_Name}</h2>
                <h2>{a.Email}</h2>
              </div>
            ))}
            <button type="button" onClick={}>Edit Profile</button>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  )
}

export default Account
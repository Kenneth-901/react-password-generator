import React, { useEffect, useState } from "react"
import Navbar from "./NavBar/navbar"
import Footer from "./footerContainer"
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
  const [phaseQuestion, getPhaseQuestion] = useState([]);
  const [passwordType, setPasswordType] = useState(false);
  const [updateConfirm, setUpdateConfirm] = useState(false);
  // const bool = window.localStorage.getItem("isLoggedIn");
  const decrypted = AES.decrypt(window.sessionStorage.getItem("email"), 'MYKEY4DEMO');
  const loggedEmail = decrypted.toString(enc.Utf8);
  const question = item.map(m => m.question);
  const question1 = item.map(m => m.question2);
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
    Axios.get(`http://localhost:3001/phaseQuestion`).then(resp => {
      getPhaseQuestion(resp.data);
    });
  }, []);

  const phaseQuestionList = React.useMemo(() => {
    if (!phaseQuestion.length) return [];

    const mappedList = phaseQuestion.map(list => ({
      value: `${list.questionsID}`,
      label: `${list.question}`,
    }));

    return mappedList;
  }, [phaseQuestion]);

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
              <div className="">
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
                <InlineDetails
                  title={"Password: "}
                  label={"*********"}
                />
                <InlineDetails
                  title={"PhaseQuestion: "}
                  label={phaseQuestionList.filter(b => b.value === question.toString()).map(m => m.label).toString()}
                />
                <InlineDetails
                  title={"PhaseQuestion1: "}
                  label={phaseQuestionList.filter(b => b.value === question1.toString()).map(m => m.label).toString()}
                />
              </div>
            </div>
          )}
        />
        </>
      ))}
      </div>
      
      <Footer />
    </>
  )
}

export default Account
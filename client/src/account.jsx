import React, { useEffect, useState } from "react"
import Navbar from "./NavBar/navbar"
import Footer from "./footer"
import Axios from "axios"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Account = () => {

  const [item, setItem] = useState([]);
  const [passwordType, setPasswordType] = useState(false);

  const fetchUser = async () => {
    Axios.get('http://localhost:3001/account').then(resp => {
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
      <Navbar />

      {/* Help me with this */}
      {/* Here to display all the account info */}
      <div className="App">
        <div className="card">
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
            <button>Edit Profile</button>
          </div>
        </div>
      </div>
      
      <form>
        {item.length > 0 && item.map(m => (
          <div key={m.userID}>
            <fieldset>
              <legend>{`Profile: ${m.First_Name}`}</legend>
              {`User Name: ${m.First_Name} ${m.Last_Name}`}<br/>
              {`Email: ${m.Email}`}<br/>
              <input class="form-control" type="text" value={`Phone Number: ${m.Phone_Number}`} aria-label="Disabled input example" disabled readonly/><br/>
              <div className="d-flex">
                <label for="formFileSm" class="form-label">Password: </label>
                <input
                  className="form-control form-control-sm"
                  type={passwordType ? "text" : "password"}
                  value={m.Password}
                  aria-label="Disabled input example"
                  disabled
                  readonly
                />
                {/* <i onClick={togglePassword}>
                  {passwordType ? <FaEye /> : <FaEyeSlash />}
                </i> */}
              </div><br/>
              {`Date of Birth: ${m.DOB}`}
            </fieldset><br/>
          </div>
        ))}
      </form>

      <Footer />
    </>
  )
}

export default Account
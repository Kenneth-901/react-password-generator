import React, { useState } from "react"
import Footer from "./footer"
import Navbar from "./navbar"
import Axios from "axios"

const Login = () => {
  
  const [vali_email, setvaliemail] = useState("")
  const [vali_pass, setvalipass] = useState("")

  const [loginStatus, setLoginStatus] = useState("");

  const logIn = () => {
    Axios.post("http://localhost:3001/login", {
      email: vali_email,
      password: vali_pass,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
  };

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     if (response.data.loggedIn == true) {
  //       setLoginStatus(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  return(
    <>
      <Navbar />

      <br />

      <div className="App">
        <div className="information">
          <input 
            type="email" 
            name="checkEmail"
            onChange={(event) => {setvaliemail(event.target.value)}}
            placeholder="Email"
          />

          <br />

          <input 
            type="password" 
            name="checkPassword"
            onChange={(event) => {setvalipass(event.target.value)}}
            placeholder="Password"
          />  

          <br />

          <button onClick={logIn}>Log In</button>
        </div>
      </div>
    
      <h1>{loginStatus}</h1>
      
      <Footer />
    </>
  )
}

export default Login
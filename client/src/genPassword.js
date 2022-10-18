import React, { useEffect, useState } from "react"
import Navbar from "./NavBar/navbar"
import Footer from "./footer"
import Axios from "axios"

const GenPassword = () => {
  
  const [genPass, setgenPass] = useState("")

  const authenticate = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then((response) => {
      // console.log(response)
      // console.log(response.data.auth)
      if(response.data.auth){
        setgenPass("Success")
      }else{
        setgenPass("fail")
      }
    })
  }
  
  return(
    <>
      <Navbar />
      <button onClick={authenticate}>View Password</button>
      <p>{genPass}</p>
      {/* Here to display all the Generated Password by the user */}
    
      <Footer /> 
    </>
  )
}

export default GenPassword
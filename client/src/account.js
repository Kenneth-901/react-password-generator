import React from "react"
import Navbar from "./navbar"
import Footer from "./footer"

const Account = () => {
  return(
    <>
      <Navbar />

      {/* Help me with this */}
      {/* Here to display all the account info */}
      <div>
        <h1>User Name: [firstName + lastName]</h1>

        <h1>Email: </h1>

        <h1>Password: [needs to be hidden]</h1><p>[icon for displaying the password]</p>

        <h1>Date of Birth: </h1>
        
        <h1>Phone Number: </h1>
      </div>

      <Footer />
    </>
  )
}

export default Account
import React, { useState } from 'react'
import Axios from "axios";
import Navbar from './NavBar/navbar';
import Footer from './footerContainer';
import PassMeter from './components/passMeter';
import PassGen from './components/passGen';

const HomePage = () => {
  
  // const isLoggedIn = () => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     console.log(response)
  //     console.log(response.data.loggedIn)
  //   })
  // }

  return(
    <>
      {/* Navigation bar here */}
      <Navbar />

      {/* <button onClick={isLoggedIn}>click here</button> */}

      <main>
        <div className='App'>
          <div className='information'>
            {/* Password Meter */}
            <PassMeter />
            
            <br />

            {/* Password Generator */}
            <PassGen />
          </div>
        </div>
      </main>

      {/* Footer bar here */}
      <Footer />
    </>
  )
}

export default HomePage
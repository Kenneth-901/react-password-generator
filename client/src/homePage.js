import react from 'react'
// import "./homePage.css";
import { useState } from "react";
import Axios from "axios";
import Navbar from './navbar';
import Footer from './footer';

const HomePage = () => {
  
  const [passMeter, setpassMeter] = useState("")
  const [answer1, setanswer1] = useState("")
  const [answer2, setanswer2] = useState("")
  const [answer3, setanswer3] = useState("")
  
  return(
    <>
      {/* Navigation bar here */}
      <Navbar />

      <main>
        
        {/* Should I put the input into <form>? */}

        {/* Password Meter */}
        <section>
          <h2>Password Meter: </h2>
          
          <input 
            type="text" 
            name="passMeter"
            onChange={(event) => {setpassMeter(event.target.value)}}
            placeholder="Enter Password"
          />

          <br /><br />
          {/* Need to put either "onClick" or "onSubmit" */}
          <input type="submit" value="Check Password"/>
        </section>

        {/* Password Generator */}
        <section>
          <h2>Password Generator: </h2>
          
          <h4>[Question_1]</h4>
          <input 
            type="text" 
            name="answer1"
            onChange={(event) => {setanswer1(event.target.value)}}
            placeholder="Answer 1"
          />

          <h4>[Question_2]</h4>
          <input 
            type="text" 
            name="answer2"
            onChange={(event) => {setanswer2(event.target.value)}}
            placeholder="Answer 2"
          />

          <h4>[Question_3]</h4>
          <input 
            type="text" 
            name="answer3"
            onChange={(event) => {setanswer3(event.target.value)}}
            placeholder="Answer 3"
          />

          <br /><br />
          {/* Need to put either "onClick" or "onSubmit" */}
          <input type="submit" value="Generate Password"/>
        </section>
      </main>

      {/* Footer bar here */}
      <Footer />
    </>
  )
}

export default HomePage
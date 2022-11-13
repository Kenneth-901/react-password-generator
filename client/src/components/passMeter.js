import React, { useEffect, useMemo, useState } from 'react'
import "../styles/homepage.css" 
import "../App.css"

const PassMeter = () => {
  
  const [checkPass, setcheckPass] = useState("")
  const [reasons, setreasons] = useState([])

  const checkPassword = () => {
    const weaknesses = calculatePasswordStrength(checkPass)
    
    setreasons([])

    checkPass.length === 0 ? 
      setreasons("No password found, please enter password") 
      : 
      weaknesses.forEach((weakness) => {
        if(weakness == null) return
        
        setreasons((prevState) => [
          ...prevState, <>
            {weakness.message} <br />
            </>
        ])
      })
  }
  
  const calculatePasswordStrength = (password) => {
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(uppercaseWeakness(password))
    weaknesses.push(lowercaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialCharactersWeakness(password))
    return weaknesses
  }

  const lengthWeakness = (password) => {
    const length = password.length
  
    if (length <= 8) {
      return {
        message: 'Your password is too short',
        deduction: 40
      }
    }
  
    if (length <= 12) {
      return {
        message: 'Your password could be longer',
        deduction: 15
      }
    }
  }
  
  const uppercaseWeakness = (password) => {
    return characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters')
  }
  
  const lowercaseWeakness = (password) => {
    return characterTypeWeakness(password, /[a-z]/g, 'lowercase characters')
  }
  
  const numberWeakness = (password) => {
    return characterTypeWeakness(password, /[0-9]/g, 'numbers')
  }
  
  const specialCharactersWeakness = (password) => {
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters')
  }

  const characterTypeWeakness = (password, regex, type) => {
    const matches = password.match(regex) || []
  
    if (matches.length === 0) {
      return {
        message: `Your password has no ${type}`,
        deduction: 20
      }
    }
  
    if (matches.length <= 1) {
      return {
        message: `Your password could use more ${type}`,
        deduction: 5
      }
    }
  }

  useMemo(() => {
    if(reasons.length === 0 && checkPass.length !== 0){
      setreasons("Your password is complex and secure")
    }
  }, [reasons])

  return(
  <>
    <section>
            
      <h2>Password Meter: </h2>
      
      <input 
        type="text" 
        name="passwordMeter"
        onChange={(event) => {setcheckPass(event.target.value)}}
        placeholder="Enter Password"
      />  

      <br />

      <button className='generateButton' onClick={checkPassword}>
        <p className='button-content'>Check Password</p>
      </button>



      {reasons.length === 0 ?
        <></>
        :
        <div className='reason'>
          {reasons}
        </div>  
      }
      
    </section>
  </>
  )
}

export default PassMeter
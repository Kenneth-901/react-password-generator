import React, { useEffect, useState } from 'react'

const PassMeter = () => {
  
  const [passMeter, setpassMeter] = useState("")
  const [reasons, setreasons] = useState()
  
  const updateStrengthMeter = () => {
    const weaknesses = calculatePasswordStrength(passMeter)
    // console.log(weaknesses)
    let strength = 100
    // reasonsContainer.innerHTML = ''
    weaknesses.forEach(weakness => {
      if (weakness == null) return
      strength -= weakness.deduction
      
      // const messageElement = document.createElement('div')
      // messageElement.innerText = weakness.message
      // reasonsContainer.appendChild(messageElement)
    })
    // strengthMeter.style.setProperty('--strength', strength)
  }
  console.log(reasons)
  useEffect(updateStrengthMeter, [])

  const calculatePasswordStrength = (password) => {
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(uppercaseWeakness(password))
    weaknesses.push(lowercaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialCharactersWeakness(password))
    weaknesses.push(repeatCharactersWeakness(password))
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
  
  const repeatCharactersWeakness = (password) => {
    const matches = password.match(/(.)\1/g) || []
    if (matches.length > 0) {
      return {
        message: 'Your password has repeat characters',
        deduction: matches.length * 10
      }
    }
  }

  const characterTypeWeakness = (password, regex, type) => {
    const matches = password.match(regex) || []
  
    if (matches.length === 0) {
      return {
        message: `Your password has no ${type}`,
        deduction: 20
      }
    }
  
    if (matches.length <= 2) {
      return {
        message: `Your password could use more ${type}`,
        deduction: 5
      }
    }
  }

  return(
  <>
    <section>
            
      <h2>Password Meter: </h2>
      
      <div className="strength-meter" id="strength-meter"></div> 

      <br />

      {/* <input className="password-input" id="password-input" value="password" type="text" autoFocus aria-labelledby='password'/> */}

      <input 
        type="text" 
        name="passwordMeter"
        onChange={(event) => {setpassMeter(event.target.value)}}
        placeholder="Enter Password"
      />  

      <div id="reasons" className="reasons">{reasons}</div>
    </section>
  </>
  )
}

export default PassMeter
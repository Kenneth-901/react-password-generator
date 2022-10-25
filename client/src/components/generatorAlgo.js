import React, { useState } from "react"

export const Algo1 = (answer, answer2, answer3) => {
  // const [allPassword, setallPassword] = useState([])
  const ans = answer.split(" ").join("")
  const ans2 = answer2.split(" ").join("")
  const ans3Length = answer3.toString().length
  const ans3 = answer3
  const symbol = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "="]
  
  const randomInt = ans[Math.floor(Math.random() * ans.length)]
  const randomInt2 = ans2[Math.floor(Math.random() * ans2.length)]
  const symbolIndex = Math.floor(Math.random() * symbol.length)
  const chosenSymbol = symbol[symbolIndex]
  const chosenSymbol2 = symbolIndex === 11 ? symbol[symbolIndex - 1] : symbol[symbolIndex + 1]

  // console.log(symbolIndex)
  
  const genPass1 = chosenSymbol.concat(ans).concat(answer3).concat(ans2).concat(chosenSymbol)
  const genPass2 = chosenSymbol.concat(ans).concat(answer3).concat(ans2).concat(chosenSymbol2)
  // 369@Passwork147#
  const genpass3 = ""

  
  console.log(ans3Length)

  for(let i = ans3Length; i <= 3; i++){
    
    ans3 = "" + ans3 + 1
  }

  console.log(`Answer3: ${ans3}`)
  // console.log(typeof)

  return <>
    {genPass1}

    <br /><br />

    {genPass2}
  </>
}
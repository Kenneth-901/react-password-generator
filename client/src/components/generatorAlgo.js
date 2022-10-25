import React, { useState } from "react"

const Algo1 = (answer, answer2, answer3) => {
  const ans = answer.split(" ").join("")
  const ans2 = answer2.split(" ").join("")
  let ans3Length = answer3.toString().length
  let additional = 0
  let ans3 = answer3
  const symbol = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "="]
  
  if(ans3Length < 2){
    do{
      answer3 == 9 ? additional = 0 : additional =  answer3 + ans3Length
      console.log(`Additional: ${additional}`)
      ans3 += "" + additional
      console.log(`Ans: ${ans3}`)
      ans3Length++
    }while(ans3Length < 2)
  }

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
  const genpass4 = ""
  const genpass5 = ""
  
  // console.log(`Answer: ${ans3}`)

  return [genPass1, genPass2]
}

export default Algo1
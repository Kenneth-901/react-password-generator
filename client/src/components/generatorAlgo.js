const Algo1 = (answer, answer2, answer3) => {
  let ans = answer.replace(/\s/g,'')
  let ans2 = answer2.replace(/\s/g,'')
  let ans3Length = answer3.toString().length
  let additional = 0
  let ans3 = answer3
  const symbol = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "="]

  if(ans3Length < 2){
    do{
      answer3 === 9 ? additional = 0 : additional =  answer3 + ans3Length
      // console.log(`Additional: ${additional}`)
      ans3 += "" + additional
      // console.log(`Ans: ${ans3}`)
      ans3Length++
    }while(ans3Length < 2)
  }

  const randomIndex = Math.floor(Math.random() * ans.length)
  const randomIndex2 = Math.floor(Math.random() * ans2.length)
  const symbolIndex = Math.floor(Math.random() * symbol.length)
  const chosenSymbol = symbol[symbolIndex]
  const chosenSymbol2 = symbolIndex === 11 ? symbol[symbolIndex - 1] : symbol[symbolIndex + 1]

  const capitalization = (string) => {
    if(randomIndex === 0){
      string = string.charAt(randomIndex).toUpperCase() + string.slice(1)
    }else if(randomIndex === ans.length - 1){
      string = string.slice(0, string.length - 1) + string.charAt(randomIndex).toUpperCase()
    }else{
      string = string.slice(0, randomIndex) + string.charAt(randomIndex).toUpperCase() + string.slice(randomIndex + 1)
    }

    return string
  }

  if(randomIndex === 0){
    ans = ans.charAt(randomIndex).toUpperCase() + ans.slice(1)
  }else if(randomIndex === ans.length - 1){
    ans = ans.slice(0, ans.length - 1) + ans.charAt(randomIndex).toUpperCase()
  }else{
    ans = ans.slice(0, randomIndex) + ans.charAt(randomIndex).toUpperCase() + ans.slice(randomIndex + 1)
  }

  if(randomIndex2 === 0){
    ans2 = ans2.charAt(randomIndex2).toUpperCase() + ans2.slice(1)
  }else if(randomIndex2 === ans.length - 1){
    ans2 = ans2.slice(0, ans2.length - 1) + ans2.charAt(randomIndex2).toUpperCase()
  }else{
    ans2 = ans2.slice(0, randomIndex2) + ans2.charAt(randomIndex2).toUpperCase() + ans2.slice(randomIndex2 + 1)
  }

  // console.log(symbolIndex)
  
  const genPass1 = chosenSymbol.concat(ans).concat(answer3).concat(ans2).concat(chosenSymbol)
  const genPass2 = chosenSymbol.concat(ans).concat(answer3).concat(ans2).concat(chosenSymbol2)
  // 369@Passwork147#
  const genpass3 = ""
  const genpass4 = ""
  const genpass5 = ""
  
  console.log(`Answer: ${capitalization(ans)}; Answer: ${capitalization(ans)}; RandomIndex: ${randomIndex}`)
  console.log(`Answer: ${capitalization(ans)}; Answer: ${capitalization(ans)}; RandomIndex: ${randomIndex}`)
  console.log(`Answer: ${ans2}; RandomIndex: ${randomIndex2}`)
  // console.log(`randomInt: ${randomIndex}`)


  return [genPass1, genPass2]
}

export default Algo1
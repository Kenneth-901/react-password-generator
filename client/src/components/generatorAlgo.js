const Algo1 = (answer, answer2, answer3) => {
  let joinAns = answer.replace(/\s/g,'').toLowerCase()
  let joinAns2 = answer2.replace(/\s/g,'').toLowerCase()
  const splitAns3 = answer3.toString().split("")
  const symbol = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "="]

  const addingNumbers = (forAnswer3) => {
    let additional = 0
    let ans3Length = forAnswer3.toString().length
    let ans3 = forAnswer3

    if(ans3Length < 2){
      forAnswer3 === 9 ? additional = 0 : additional =  forAnswer3 + ans3Length
      // console.log(`Additional: ${additional}`)
      ans3 += "" + additional
      // console.log(`Ans: ${ans3}`)
      ans3Length++
    }

    return ans3
  }

  const randomIndex = Math.floor(Math.random() * joinAns.length)
  const randomIndex2 = Math.floor(Math.random() * joinAns2.length)
  const symbolIndex = Math.floor(Math.random() * symbol.length)
  const chosenSymbol = symbol[symbolIndex]
  const chosenSymbol2 = symbolIndex === 11 ? symbol[symbolIndex - 1] : symbol[symbolIndex + 1]

  const capitalization = (string, string2) => {
    // For answer 1
    if(randomIndex === 0){
      string = string.charAt(randomIndex).toUpperCase() + string.slice(1)
    }else if(randomIndex === string.length - 1){
      string = string.slice(0, string.length - 1) + string.charAt(randomIndex).toUpperCase()
    }else{
      string = string.slice(0, randomIndex) + string.charAt(randomIndex).toUpperCase() + string.slice(randomIndex + 1)
    }

    // For answer 2
    if(randomIndex2 === 0){
      string2 = string2.charAt(randomIndex2).toUpperCase() + string2.slice(1)
    }else if(randomIndex2 === string2.length - 1){
      string2 = string2.slice(0, string2.length - 1) + string2.charAt(randomIndex2).toUpperCase()
    }else{
      string2 = string2.slice(0, randomIndex2) + string2.charAt(randomIndex2).toUpperCase() + string2.slice(randomIndex2 + 1)
    }

    return [string, string2]
  }

  const afterCapitalize = capitalization(joinAns, joinAns2)
  const afterAddingNumbers = addingNumbers(answer3).toString()
  
  const genPass1 = chosenSymbol.concat(joinAns).concat(answer3).concat(joinAns2).concat(chosenSymbol)

  const genPass2 = chosenSymbol.concat(afterCapitalize[0]).concat(answer3).concat(afterCapitalize[1]).concat(chosenSymbol2)

  // 369@Passwork147#
  const genpass3 = afterAddingNumbers.concat(chosenSymbol).concat(afterCapitalize[0]).concat(afterAddingNumbers).concat(chosenSymbol2)

  const genpass4 = afterAddingNumbers.concat(chosenSymbol).concat(afterCapitalize[1]).concat(afterAddingNumbers).concat(chosenSymbol2)
  
  const genpass5 = ""
  
  // console.log(`${afterCapitalize[0]} RandomIndex: ${randomIndex}`)
  // console.log(`${afterCapitalize[1]}; RandomIndex: ${randomIndex}`)
  // // console.log(`${addingNumbers(answer3)}`)
  // console.log(`${afterAddingNumbers}`)
  // console.log(`${typeof afterAddingNumbers}`)
  console.log(splitAns3)

  // console.log(`randomInt: ${randomIndex}`)


  return [genPass1, genPass2, genpass3, genpass4]
}

export default Algo1
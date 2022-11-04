import Axios from "axios"

const Algo1 = (answer, answer2, answer3) => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn")
  const userID = sessionStorage.getItem("userID")
  // Declaring Variables
  let joinAns = answer.replace(/\s/g,'').toLowerCase()
  let joinAns2 = answer2.replace(/\s/g,'').toLowerCase()
  const splitAns3 = answer3.toString().split("")
  const symbol = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "="]
  const randomIndex = Math.floor(Math.random() * joinAns.length)
  const randomIndex2 = Math.floor(Math.random() * joinAns2.length)
  const symbolIndex = Math.floor(Math.random() * symbol.length)
  const chosenSymbol = symbol[symbolIndex]
  const chosenSymbol2 = symbolIndex === 11 ? symbol[symbolIndex - 1] : symbol[symbolIndex + 1]


  // Functions to use in the Password Formats
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

  const addingSymbol = () => {
    let addedSymbol = ""

    if(splitAns3.length === 1){
      if(splitAns3[0] == 0){
        addedSymbol = symbol[9]
      }else{
        addedSymbol = symbol[splitAns3[0] - 1]
      }
    }else{
      if(splitAns3[1] == 0){
        addedSymbol = symbol[9]
      }else{
        addedSymbol = symbol[splitAns3[1] - 1]
      }
    }

    return addedSymbol.concat(addedSymbol)
  }


  // All 5 Password Formats
  const firstPasswordFormat = (string, string2, integer, symbol) => {
    return symbol.concat(string).concat(integer).concat(string2).concat(symbol)
  }
  
  const secondPasswordFormat = (string, string2) => {
    string = string.charAt(0).toUpperCase() + string.slice(1)

    string2 = string2.slice(0, string2.length - 1) + string2.charAt(string2.length - 1).toUpperCase()
    
    let specialCharacter = addingSymbol()

    return string.concat(answer3).concat(string2).concat(specialCharacter)
  }

  const thirdPasswordFormat = (string, string2, integer) => {
    let specialCharacter = addingSymbol()
    let chosenIntegers = addingNumbers(integer)

    if(string.length <= 8){
      string = string.charAt(0).toUpperCase() + string.slice(1) 
      string2 = string2.charAt(0).toUpperCase() + string2.slice(1)

      return string.concat(string2).concat(chosenIntegers).concat(specialCharacter)

    }else{
      string = string.charAt(0).toUpperCase() + string.slice(1, string.length - 1) + string.charAt(string.length - 1).toUpperCase()

      return string.concat(specialCharacter).concat(chosenIntegers) 
    }
  }

  const fourthPasswordFormat = (string, string2, integer) => {
    let specialCharacter = addingSymbol()
    let chosenIntegers = addingNumbers(integer)

    if(string2.length <= 8){
      string = string.charAt(0).toUpperCase() + string.slice(1) 
      string2 = string2.charAt(0).toUpperCase() + string2.slice(1)

      return string2.concat(string).concat(chosenIntegers).concat(specialCharacter)

    }else{
      string2 = string2.charAt(0).toUpperCase() + string2.slice(1, string2.length - 1) + string2.charAt(string2.length - 1).toUpperCase()

      return string2.concat(specialCharacter).concat(chosenIntegers) 
    }
  }

  const fifthPasswordFormat = (string, string2, integer) => {
    return "Hello"
  }

  const afterCapitalize = capitalization(joinAns, joinAns2)
  const afterAddingNumbers = addingNumbers(answer3).toString()
  
  const genPass1 = firstPasswordFormat(joinAns, joinAns2, answer3, chosenSymbol)

  const genPass2 = secondPasswordFormat(joinAns, joinAns2)

  const genpass3 = thirdPasswordFormat(joinAns, joinAns2, answer3)
  
  const genpass4 = fourthPasswordFormat(joinAns, joinAns2, answer3)

  const genpass5 = fifthPasswordFormat(joinAns, joinAns2, answer3)
  
  const allPassword = [genPass1, genPass2, genpass3, genpass4, genpass5]

  if(isLoggedIn){

    const data = {
      allPassword: allPassword,
      userID: userID
    }
    
    Axios.post("http://localhost:3001/addGeneratedPassToAcc", data)
  }else{
    console.log("need to be logged in")
  }

  return allPassword
}

export default Algo1
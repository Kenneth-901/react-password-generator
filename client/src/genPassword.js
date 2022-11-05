import React, { useEffect, useState } from "react"
import Navbar from "./NavBar/navbar"
import Footer from "./footerContainer"
import Axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikDropDownList from "./form/formikDropDownList"
import * as Yup from "yup"

const GenPassword = () => {
  
  const [verifyUser, setverifyUser] = useState()
  const [item, setItem] = useState([]);
  const userID = sessionStorage.getItem("userID")
  const email = sessionStorage.getItem("email2")

  const vali = (data) => {
    Axios.post(`http://localhost:3001/generateToken/${userID}`).then((response) => {

      if(response.data.gotToken){
        localStorage.setItem("token", response.data.token)
        setverifyUser(true)

        // THE IDEA WAS AFTER THEY ARE VERIFIED THEN GET DATA
        // getGenPass()
        
      }else{
        console.log(response.data.error)
      }
    })
  }


  // HELP ME HERE
  // I GOT THE DATA BUT DK HOW TO DISPLAY
  const getGenPass = () => {
    Axios.get(`http://localhost:3001/viewGeneratedPass/${userID}`).then((response) => {
      // console.log(response.data)
      // console.log(response.data.length)
      const result = response.data
      const getPass = []
      
      for(let i in result){
        // console.log(response.data[i].password)
        getPass.push(response.data[i].password)
      }
      
      const mappedList = result.map(list => ({
        primaryValue: `${list.genPassID}`,
        secondaryValue: `${list.userID}`,
        label: `${list.password}`,
      }));
      
      // console.log(mappedList[0])

      return <h1>{mappedList[0]}</h1>
    })
  }


  const initialValues = {
    phaseQuestion: "",
    phaseAnswer: "",
  };

  const validationSchema = Yup.object().shape({
    phaseQuestion: Yup.mixed(),
    phaseAnswer: Yup.string().required("Please enter your phase").test('Unique Phase', "Incorrect Answer",
      function(avalue){
        return new Promise((resolve, reject) => {
          const data = {
            email: email,
            questionNumber: this.parent.phaseQuestion.value,
            phaseAnswer: avalue
          }

          Axios.post("http://localhost:3001/comparedPhaseAnswer", data).then((response) => {
            if(response.data.length > 0){
              resolve(true)
              // setcorrectPhase(true)
            }else{
              resolve(false)
              // setcorrectPhase(false)
            }
          })
        })
      }),
  });


  useEffect(() => {
    Axios.get(`http://localhost:3001/selectedPhaseQuestion/${email}`).then(resp => { setItem(resp.data); });
  }, [])

  const phaseQuestionList = React.useMemo(() => {
    if (!item.length) return [];

    const mappedList = item.map(list => ({
      value: `${list.questionsID}`,
      label: `${list.question}`,
    }));

    return mappedList;
  }, [item]);
  
  useEffect(() => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then((response) => {
      if(response.data.auth){
        setverifyUser(true)
      }else{
        setverifyUser(false)
      }
    })
  }, [])

  return(
    <>
      <Navbar />

      <div className="App">
        <div className="information">
          {!verifyUser ?
            <Formik 
            initialValues = {initialValues}
            onSubmit={vali} 
            validationSchema={validationSchema}>
              <Form>
                <FormikDropDownList 
                  id="PhaseQuestion" 
                  name="phaseQuestion"
                  values={phaseQuestionList}
                  placeholder="Select"
                  className={"input100"}
                />
                <ErrorMessage name="phaseQuestion" component="span"/>

                <br />

                <Field
                  id="PhaseAnswer"
                  name="phaseAnswer"
                  placeholder="Phase Answer"
                  className={"input100"}
                />
                <ErrorMessage name="phaseAnswer" component="span"/>

                <br />

                <button type="submit">View my passwords</button> 
              </Form>
            </Formik>
            : 

            // WANT TO DISPLAY HERE AFTER THEY ARE VERIFIED
            // getGenPass()
            <h1>Here</h1>
            }

          {/* {getGenPass()} */}

        </div>
      </div>

      <Footer /> 
    </>
  )
}

export default GenPassword
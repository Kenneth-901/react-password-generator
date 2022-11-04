import React, { useEffect, useState } from "react"
import Navbar from "./NavBar/navbar"
import Footer from "./footerContainer"
import Axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikDropDownList from "./form/formikDropDownList"
import * as Yup from "yup"

const GenPassword = () => {
  
  const [genPass, setgenPass] = useState("")
  const [item, setItem] = useState([]);
  const [correctPhase, setcorrectPhase] = useState(false)
  const email = sessionStorage.getItem("email2")


  const authenticate = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then((response) => {
      // console.log(response)
      // console.log(response.data.auth)
      if(response.data.auth){
        setgenPass("Success")
      }else{
        setgenPass("fail")
      }
    })
  }

  const vali = (data) => {
    Axios.post("http://localhost:3001/validateUser", data).then((response) => {
      console.log(response)
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
              setcorrectPhase(true)
            }else{
              resolve(false)
              setcorrectPhase(false)
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
  
  return(
    <>
      <Navbar />

      <div className="App">
        <div className="information">
          {!correctPhase ?
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
          : <h1>Here</h1>}
        </div>
      </div>

      <Footer /> 
    </>
  )
}

export default GenPassword
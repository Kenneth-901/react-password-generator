import React, { useEffect, useState } from 'react'
import Axios from "axios"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikDropDownList from "../form/formikDropDownList"
import { useNavigate } from "react-router-dom";
import { Algo1 } from './generatorAlgo'
import "../styles/homepage.css" 

const PassGen = () => {
  
  const [stringQuestion, setstringQuestion] = useState([])
  const [intQuestion, setintQuestion] = useState([])
  const [item, setitem] = useState([])
  const [password, setpassword] = useState()

  const initialValues = {
    generatorQuestion: "",
    generatorQuestion2: "",
    generatorQuestion3: "",
    generatorAnswer: "",
    generatorAnswer2: "",
    generatorAnswer3: "",
  }

  const validationSchema = Yup.object().shape({
    generatorQuestion: Yup.mixed(),
    generatorQuestion2: Yup.mixed(),
    generatorQuestion3: Yup.mixed(),
    generatorAnswer: Yup.string().required("Please enter your answer"),
    generatorAnswer2: Yup.string().required("Please enter your answer"),
    generatorAnswer3: Yup.string().required("Please enter your answer in numbers"),
  })

  const generatePassword = (data) => {
    const ans = data.generatorAnswer.split(" ").join("")
    const ans2 = data.generatorAnswer2.split(" ").join("")
    // console.log(`${ans} and ${ans2[0]}`)
    const together = ans.concat(ans2)
    // console.log(data.generatorAnswer3)
     setpassword(Algo1(data.generatorAnswer, data.generatorAnswer2, data.generatorAnswer3))
  }

  const generatorQuestion = React.useMemo(() => {
    if (!item.length) return [];

    setstringQuestion([])

    item.forEach((a) => {
      let count = 5

      if(a.passGenID <= count){
        setstringQuestion((prevState) => [
          ...prevState, a
        ])
      }
    })

    const mappedList = stringQuestion.map(list => ({
      value: `${list.passGenID}`,
      label: `${list.question}`,
    }));

    return mappedList;
  }, [item]);

  const generatorQuestion2 = React.useMemo(() => {
    if (!item.length) return [];

    setintQuestion([])

    item.forEach((a) => {
      let count = 6

      if(a.passGenID >= count){
        setintQuestion((prevState) => [
          ...prevState, a
        ])
      }
    })

    const mappedList = intQuestion.map(list => ({
      value: `${list.passGenID}`,
      label: `${list.question}`,
    }));

    return mappedList;
  }, [item]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/generatorQuestion`).then(resp => { setitem(resp.data); }); 
  }, [])

  return(
  <>
    <section className='App'>
      <div className='information'>
        <h2>Password Generator: </h2> 
        <Formik
          initialValues={initialValues}
          onSubmit={generatePassword}
          validationSchema={validationSchema}>

          <Form>
            <FormikDropDownList 
              id="generatorQuestion" 
              name="generatorQuestion"
              values={generatorQuestion}
              placeholder="Select"
              className={"input100"}
            />
            <ErrorMessage name="generatorQuestion" component="span"/>
            
            <br />

            <Field
              id="generatorAnswer"
              name="generatorAnswer"
              placeholder="Enter Answer"
              className={"input100"}
            />
            <ErrorMessage name="generatorAnswer" component="span" className="invalid-feedback"/>

            <br />

            <FormikDropDownList 
              id="generatorQuestion2" 
              name="generatorQuestion2"
              values={generatorQuestion}
              placeholder="Select"
              className={"input100"}
            />
            <ErrorMessage name="generatorQuestion2" component="span"/>
            
            <br />

            <Field
              id="generatorAnswer2"
              name="generatorAnswer2"
              placeholder="Enter Answer"
              className={"input100"}
            />
            <ErrorMessage name="generatorAnswer2" component="span" className="invalid-feedback"/>
            
            <br />

            <FormikDropDownList 
              id="generatorQuestion3" 
              name="generatorQuestion3"
              values={generatorQuestion2}
              placeholder="Select"
              className={"input100"}
            />
            <ErrorMessage name="generatorQuestion3" component="span"/>
            
            <br />

            <Field
              id="generatorAnswer3"
              name="generatorAnswer3"
              placeholder="Enter Answer"
              type="number"
              className={"input100"}
            />
            <ErrorMessage name="generatorAnswer3" component="span" className="invalid-feedback"/>

            <br /><br />

            <button type="submit">Generate Password</button>
            </Form>
        </Formik>
        <h1>{password}</h1>
      </div>
    </section>
  </>
  )
}

export default PassGen
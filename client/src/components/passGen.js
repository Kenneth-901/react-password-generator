import React, { useEffect, useMemo, useState } from 'react'
import Axios from "axios"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikDropDownList from "../form/formikDropDownList"
import Algo1 from './generatorAlgo'
import "../styles/homepage.css" 
import "../App.css"
import { toast } from "../common/toast"

const PassGen = () => {
  
  const [item, setitem] = useState([])
  const [generatedPassword, setgeneratedPassword] = useState([])
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  
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
    setgeneratedPassword(Algo1(data.generatorAnswer, data.generatorAnswer2, data.generatorAnswer3))
    isLoggedIn ? toast.success("Added Successfully") : <></>
  }

  const generatorQuestion = React.useMemo(() => {
    if (!item.length) return [];
    let stringQuestion = []

    item.forEach((a) => {
      let count = 5

      if(a.passGenID <= count){
        stringQuestion.push(a)
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
    let intQuestion = []

    item.forEach((a) => {
      let count = 6

      if(a.passGenID >= count){
        intQuestion.push(a)
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
  <section>
    <h2>Password Generator: </h2> 
    <Formik
      initialValues={initialValues}
      onSubmit={generatePassword}
      validationSchema={validationSchema}>

      <Form className="wrapper">

        <FormikDropDownList 
          id="generatorQuestion" 
          name="generatorQuestion"
          values={generatorQuestion}
          placeholder="Select"
        />
        <ErrorMessage name="generatorQuestion" component="span"/>

        <br />

        <Field
          id="generatorAnswer"
          name="generatorAnswer"
          placeholder="Enter Answer"
        />
        <ErrorMessage name="generatorAnswer" component="span" className='errorValidation' />

        <br />

        <FormikDropDownList 
          id="generatorQuestion2" 
          name="generatorQuestion2"
          values={generatorQuestion}
          placeholder="Select"
        />
        <ErrorMessage name="generatorQuestion2" component="span"/>
        
        <br />
        
        <Field
          id="generatorAnswer2"
          name="generatorAnswer2"
          placeholder="Enter Answer"
        />
        <ErrorMessage name="generatorAnswer2" component="span" className='errorValidation'/>
        
        <br />
        
        <FormikDropDownList 
          id="generatorQuestion3" 
          name="generatorQuestion3"
          values={generatorQuestion2}
          placeholder="Select"
        />
        <ErrorMessage name="generatorQuestion3" component="span"/>

        <br />

        <Field
          id="generatorAnswer3"
          name="generatorAnswer3"
          placeholder="Enter Answer"
          type="number"
        />
        <ErrorMessage name="generatorAnswer3" component="span" className='errorValidation' />

        <br />

        <button className='generateButton' type="submit">
          <p className='button-content'>Generate Password</p>
        </button>

        </Form>
    </Formik>

    {generatedPassword.length == 0 ? 
      <></> 
      : 
      <div className='reason' style={{fontWeight: "650"}}>
        {generatedPassword[0]} 
        <br /> 
        {generatedPassword[1]}
        <br /> 
        {generatedPassword[2]} 
        <br /> 
        {generatedPassword[3]}
        <br /> 
        {generatedPassword[4]}
      </div>
    }
    
  </section>
  )
}

export default PassGen
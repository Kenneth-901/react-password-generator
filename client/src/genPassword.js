import React, { useEffect, useState } from "react"
import Navbar from "./NavBar/navbar"
import Footer from "./footerContainer"
import Axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikDropDownList from "./form/formikDropDownList"
import * as Yup from "yup"
import { toast } from "./common/toast"

const GenPassword = () => {
  
  const [verifyUser, setverifyUser] = useState()
  const [item, setItem] = useState([]);
  const [getPass, setgetPass] = useState([]);
  const [getPassID, setgetPassID] = useState([])
  const userID = sessionStorage.getItem("userID")
  const email = sessionStorage.getItem("email2")

  const vali = (data) => {
    Axios.get(`http://localhost:3001/generateToken/${userID}`).then((response) => {

      if(response.data.gotToken){
        localStorage.setItem("token", response.data.token)
        setverifyUser(true)
        getGenPass()
      }else{
        console.log(response.data.error)
      }
    })
  }

  const getGenPass = () => {
    Axios.get(`http://localhost:3001/viewGeneratedPass/${userID}`).then((response) => {
      const passList = response.data.map(a => a.password)
      const passID = response.data.map(a => a.genPassID)
      setgetPass(passList);
      setgetPassID(passID)
    }).catch (err => console.log(err))
  }

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleDelete = async (thePassID) => {
    try{
      Axios.get(`http://localhost:3001/deleteGenPassword/${thePassID}`)
      toast.success("Delete Sucessfully");
      await sleep(1500);
      window.location.reload()
    }catch(e) {
      toast.error(e);
    }
  }

  const displayPassword = () => {
    let test = []
    
    if(verifyUser){
      for(let i=0; i<getPass.length; i++){
        test.push(
        <tr>
          <td>{i + 1}</td>
          <td>{getPass[i]}</td>
          <td></td>
          <td><button onClick={() => handleDelete(getPassID[i])}>Delete</button></td>
        </tr>)
      }

      return test
    }
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
        getGenPass()
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
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Password</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {displayPassword()}
              </tbody>
            </table>

            // WANT TO DISPLAY HERE AFTER THEY ARE VERIFIED
            
            }

          {/* {getGenPass()} */}

        </div>
      </div>

      <Footer /> 
    </>
  )
}

export default GenPassword
import React, { useEffect, useState } from "react"
import Navbar from "./NavBar/navbar"
import Footer from "./footerContainer"
import Axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FormikDropDownList from "./form/formikDropDownList"
import ViewEditToggle from "./components/viewEditToggle";
import InlineDetails from "./components/inlineDetails";
import * as Yup from "yup"
import { toast } from "./common/toast"

const GenPassword = () => {
  
  const [verifyUser, setverifyUser] = useState()
  const [item, setItem] = useState([]);
  const [getPass, setgetPass] = useState([]);
  const [getPassID, setgetPassID] = useState([])
  const [getDescription, setgetDescription] = useState([])
  const [editDescription, seteditDescription] = useState(false)
  const [getDescriptionDate, setgetDescriptionDate] = useState([])
  const [getDescriptionTime, setgetDescriptionTime] = useState([])
  const userID = sessionStorage.getItem("userID")
  const email = sessionStorage.getItem("email2")
  const [isDeleting, setIsDeleting] = useState(false);

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
      const description = response.data.map(a => a.description)
      const descriptionDate = response.data.map(a => a.descriptionDate)
      const descriptionTime = response.data.map(a => a.descriptionTime)
      // console.log(descriptionDate)
      setgetPass(passList)
      setgetPassID(passID)
      setgetDescription(description)
      setgetDescriptionDate(descriptionDate)
      setgetDescriptionTime(descriptionTime)
    }).catch (err => console.log(err))
  }

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleDelete = (thePassID) => {
    try{
      Axios.get(`http://localhost:3001/deleteGenPassword/${thePassID}`).then(async (response) => {
        if(response.data.auth === true){
          toast.success("Delete Sucessfully");
          await sleep(1500);
          window.location.reload()
        }else{
          toast.error("Something went wrong. Please try again later.");
        }
      })
    }catch(e) {
      toast.error(e);
    }
  }

  const handleEdit = async (thePassID, thedescription) => {
    const data = {
      thePassID: thePassID,
      thedescription: thedescription.description
    }
  
    try{
      Axios.post(`http://localhost:3001/editDescription`, data)
      .then( async (response) => {
        console.log(response)
        if(response.data.auth === true){
          toast.success("Edit Sucessfully");
          await sleep(1500);
          window.location.reload()
        }else{
          toast.error("Something went wrong. Please try again later.");
        }
      })
    }catch(e) {
      toast.error(e);
    }    
  }

  const displayPassword = () => {
    const validateDescription = Yup.object().shape({
      description: Yup.string().required("Please enter a description")
    })
    
    let test = []

    if(verifyUser){
      for(let i=0; i<getPass.length; i++){
        test.push(
        <tr>
          <td>{i + 1}</td>

          <td>{getPass[i]}</td>

          <td>
            <Formik
              initialValues = {{
                description: ""
              }}
              onSubmit={(data) => handleEdit(getPassID[i], data)}
              validationSchema={validateDescription} 
              render={({ handleSubmit }) => (
                <>
                  <div className="profile-body">
                    <ViewEditToggle
                      isEditMode={editDescription}
                      renderView={(
                        <>
                          {getDescription[i]}
                        </>
                      )}
                      renderEdit={(
                        <>
                          <Form onSubmit={handleSubmit}>
                            <div className="form-group">
                              <Field
                                id="Description"
                                name="description"
                                type="text"
                              />
                              <ErrorMessage name="description" component="span"/>
                            </div>
                            <div className="form-group">
                              <button onClick={handleSubmit} type="button" className="btn btn-primary mr-2">Update</button>
                              <button type="button" onClick={() => seteditDescription(false)} className="no-decoration-btn text-gray fs-standard mr-4">Cancel</button> 
                            </div>
                          </Form>
                        </>
                      )}
                    />
                  </div>
                </>
              )}
            />

          </td>
          
          <td>{getDescriptionDate[i]}</td>

          <td>{getDescriptionTime[i]}</td>

          <td>{editDescription === false && <button className="profile-btn" type="button" onClick={() => seteditDescription(true)}>Edit</button>}</td>
          
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
        <div className="test">
          {!verifyUser ?
            <Formik 
            initialValues = {initialValues}
            onSubmit={vali} 
            validationSchema={validationSchema}>
              <Form className="wrapper">

                <div className="dropDown">
                  <FormikDropDownList 
                    id="PhaseQuestion" 
                    name="phaseQuestion"
                    values={phaseQuestionList}
                    placeholder="Select"
                  />
                  <ErrorMessage name="phaseQuestion" component="span"/>
                </div>

                <br />

                <Field
                  id="PhaseAnswer"
                  name="phaseAnswer"
                  placeholder="Phase Answer"
                />
                <ErrorMessage name="phaseAnswer" component="span" className="errorValidation" style={{marginTop: "5px"}}/>

                <br />

                <button type="submit" className="updateButton" style={{marginTop: "1rem"}}>View passwords</button> 
              </Form>
            </Formik>
            : 
            <table style={{width: "100%"}}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Password</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Time</th>
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
    </div>

    <Footer /> 
    </>
  )
}

export default GenPassword
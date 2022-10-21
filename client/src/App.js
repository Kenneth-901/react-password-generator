import "./App.css";
import "./styles/modal.scss";
// import React, { useState } from "react";
// import Axios from "axios";
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import HomePage from "./homePage";
import Login from "./login";
import Signup from "./signup";
import Account from "./account";
import GenPassword from "./genPassword";
import SignOut from "./signout";
import UpdateProfile from "./updateProfile"
import ResetPass from "./resetPass";

const App = () => {
  
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login.js" element={<Login />} />
          <Route path="/signout.js" element={<SignOut />} />
          <Route path="/signup.js" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/genPassword.js" element={<GenPassword />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/resetPass.js" element={<ResetPass />}/>
        </Routes>
      </Router>
    </>
  )

  // THIS IS JUST TO TEST

  // const [name, setName] = useState("")

  // const addUser = () => {
  //   Axios.post("http://localhost:3001/create", {
  //     name: name
  //   })
  // }

  // return (
  //   <div className="App">
  //     <div className="information">
  //       <label>Name:</label>
  //       <input type="text" onChange={(event) => {setName(event.target.value)}}/>

  //       <button onClick={addUser}>Add User</button>
  //     </div>
  //   </div>
  // )
}


// THIS IS FROM THE VIDEO

// function App() {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState(0);
//   const [country, setCountry] = useState("");
//   const [position, setPosition] = useState("");
//   const [wage, setWage] = useState(0);

//   const [newWage, setNewWage] = useState(0);

//   const [employeeList, setEmployeeList] = useState([]);

//   const addEmployee = () => {
//     Axios.post("http://localhost:3001/create", {
//       name: name,
//       age: age,
//       country: country,
//       position: position,
//       wage: wage,
//     }).then(() => {
//       setEmployeeList([
//         ...employeeList,
//         {
//           name: name,
//           age: age,
//           country: country,
//           position: position,
//           wage: wage,
//         },
//       ]);
//     });
//   };

//   const getEmployees = () => {
//     Axios.get("http://localhost:3001/employees").then((response) => {
//       setEmployeeList(response.data);
//     });
//   };

//   const updateEmployeeWage = (id) => {
//     Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
//       (response) => {
//         setEmployeeList(
//           employeeList.map((val) => {
//             return val.id == id
//               ? {
//                   id: val.id,
//                   name: val.name,
//                   country: val.country,
//                   age: val.age,
//                   position: val.position,
//                   wage: newWage,
//                 }
//               : val;
//           })
//         );
//       }
//     );
//   };

//   const deleteEmployee = (id) => {
//     Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
//       setEmployeeList(
//         employeeList.filter((val) => {
//           return val.id != id;
//         })
//       );
//     });
//   };

//   return (
//     <div className="App">
//       <div className="information">
//         <label>Name:</label>
//         <input
//           type="text"
//           onChange={(event) => {
//             setName(event.target.value);
//           }}
//         />
//         <label>Age:</label>
//         <input
//           type="number"
//           onChange={(event) => {
//             setAge(event.target.value);
//           }}
//         />
//         <label>Country:</label>
//         <input
//           type="text"
//           onChange={(event) => {
//             setCountry(event.target.value);
//           }}
//         />
//         <label>Position:</label>
//         <input
//           type="text"
//           onChange={(event) => {
//             setPosition(event.target.value);
//           }}
//         />
//         <label>Wage (year):</label>
//         <input
//           type="number"
//           onChange={(event) => {
//             setWage(event.target.value);
//           }}
//         />
//         <button onClick={addEmployee}>Add Employee</button>
//       </div>
//       <div className="employees">
//         <button onClick={getEmployees}>Show Employees</button>

//         {employeeList.map((val, key) => {
//           return (
//             <div className="employee">
//               <div>
//                 <h3>Name: {val.name}</h3>
//                 <h3>Age: {val.age}</h3>
//                 <h3>Country: {val.country}</h3>
//                 <h3>Position: {val.position}</h3>
//                 <h3>Wage: {val.wage}</h3>
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="2000..."
//                   onChange={(event) => {
//                     setNewWage(event.target.value);
//                   }}
//                 />
//                 <button
//                   onClick={() => {
//                     updateEmployeeWage(val.id);
//                   }}
//                 >
//                   {" "}
//                   Update
//                 </button>

//                 <button
//                   onClick={() => {
//                     deleteEmployee(val.id);
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

export default App;

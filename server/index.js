const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Register } = require("./models/model")

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "UPDATE"],
  credentials: true,
}));

app.use(cookieParser())

app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  key: "userID",
  secret: "testing",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24
  }
}))

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  port: 3306,
  password: "password_generator",
  database: "password_generator"
});

// INSERT INTO user (First_Name, Last_Name, Email, Password, DOB, Phone_Number, Created2) VALUES ('HO', 'TUNG', 'h@gamil.com', 'abc123', '1-11-1111', '0101112345', current_timestamp())


// SIGN UP
app.post("/create", async (req, res) => {
  
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;
  const phaseQuestion = req.body.phaseQuestion.value;
  const phaseAnswer = req.body.phaseAnswer;
  const phaseQuestion1 = req.body.phaseQuestion1.value;
  const phaseAnswer1 = req.body.phaseAnswer1;
  const phoneNumber = req.body.phoneNumber;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if(err) throw err;

    const list = "SELECT * FROM password_generator.user"
    db.query(list, (err, result) => {
      const existEmail = result.map(e => e.Email).includes(email);
      if (existEmail) {
        res.send(err);
      } else {
        db.query("INSERT INTO user (First_Name, Last_Name, Email, Password, DOB, Phone_Number, question, answer, question2, answer2, Created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, current_timestamp())", 
        [firstName, lastName, email, hash, dob, phoneNumber, phaseQuestion, phaseAnswer, phaseQuestion1, phaseAnswer1], (err, result) => {
          if (err) throw err;
          // if(err){
          //   console.log(err)
          // }else{
          //   res.send("Values Added")
          // }
        })
      };
      if (err) throw err;
    });
  })

  // THIS IS FOR THE "test" TABLE

  // const name = req.body.name

  // db.query("INSERT INTO test (meter) VALUES (?)", name, (err, result) => {
  //   console.log(err)
  // })
})

app.get("/phaseQuestion", async (req, res) => {
  const email = req.params.email;
  try {
    const qry = `SELECT * FROM password_generator.phase_questions`
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  } catch (error) {
    console.log(error);
  }
});

  // Sign up, reset password
app.get(`/existed/:value`, async (req, res) => {
  const email = req.params.value;
  
  db.getConnection( (err, conn) => {
    if (err) throw err;

    try {
      const qry = `SELECT * FROM user WHERE Email = ?`
      conn.query(qry, email, (err, result) => {
        conn.release();
        if (err) throw err;
        res.send(JSON.stringify(result));
      });
    } catch (error) {
      console.log(error);
      res.end();
    }
  });
});


// VIEW GENERATED PASSWORD

  // Function to verify the token
  // This is a middleware
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]

  if(!token){
    res.send("Token required")
  }else{
    jwt.verify(token, "testToken", (err, decoded) => {
      if(err){
        res.json({
          auth: false,
          message: "Authentication failed"
        })
      }else{
        req.userID = decoded.id
        next()
      }
    })
  }
}

  // Verify the token
app.get("/isUserAuth", verifyJWT, (req, res) => {
  // res.send("Authentication successful")
  res.json({
    auth: true,
    message: "Authentication successful"
  })
})


// LOG IN

let userSession = []

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE Email = ?", email, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      
      if (result.length > 0) {
        bcrypt.compare(password, result[0].Password, (error, response) => {
          if (response) {
            const id = result[0].userID
            const token = jwt.sign({id}, "testToken", {
              expiresIn: 30
            })            
            
            req.session.user = result;
            userSession = req.session.user
            // console.log(req.session.user);
            res.json({
              auth: true,
              token: token,
              // Edit the result because it is passing the password to front end
              // result: result[0].First_Name + result[0].Last_Name
              result: result[0]
            })
          } else {
            res.json({
              auth: false,
              message: "Wrong username/password combination!"
            })
          }
        });
      } else {
        res.json({
          auth: false,
          message: "User doesn't exist"
        })
      }
    }
  );
})

app.get("/login", (req, res) => {
  // if(req.session.user){
  //   res.send({
  //     loggedIn: true, 
  //     user: req.session.user
  //   })
  // }else{
  //   res.send({
  //     loggedIn: false
  //   })
  // }
  try {
    const result = req.session.user;
    // console.log(result)
    res.send(result);
  } catch (error) {
    console.log(error);
    res.end();
  }
})


// SIGN OUT
app.post("/signout", (req, res) => {
  // console.log(res)
  req.session.destroy((err) => {
    res.send(err)
  })
})


// ACCOUNT
app.get("/account/:email", async (req, res) => {
  const email = req.params.email;
  try {
    // const result = req.session.user;
    // if (result){
    //   res.send(result);
    // }else {
    //   res.send({message: "User Not Logged In"});
    // }
    
    const qry = `SELECT * FROM password_generator.user where Email = ?`
    db.query(qry, email, (err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  } catch (error) {
    console.log(error);
  }
});


// UPDATE ACCOUNT AUTHENTICATION
app.post("/updateConfirmation", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE Email = ?", email, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      
      if (result.length > 0) {
        bcrypt.compare(password, result[0].Password, (error, response) => {
          if (response) {          
            res.json({
              message: "Success"
            })
          } else {
            res.json({
              message: "Wrong Password"
            })
          }
        });
      } else {
        res.json({
          message: "User doesn't exist"
        })
      }
    }
  );
})

app.post("/updateProfile", async (req, res) => {
  
  const userId = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const dateOfBirth = req.body.dob;
  const phoneNumber = req.body.phoneNumber;

  if (firstName){
    const sqlQuery = `update user set First_Name="${firstName}" where userID = ${userId}`
    db.query(sqlQuery, (err, result) => {
      if (err) throw err;
    })
  } else if (lastName){
    const sqlQuery = `update user set Last_Name="${lastName}" where userID = ${userId}`
    db.query(sqlQuery, (err, result) => {
      if (err) throw err;
    })
  } else if (password){
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err) throw err;
      
      const sqlQuery = `update user set 
        Password="${hash}"
        where userID = ${userId}`
      db.query(sqlQuery, (err, result) => {
        if (err) throw err;
      })
    });
  } else if (dateOfBirth){
    const sqlQuery = `update user set DOB="${dateOfBirth}" where userID = ${userId}`
    db.query(sqlQuery, (err, result) => {
      if (err) throw err;
    })
  } else {
    const sqlQuery = `update user set Phone_Number="${phoneNumber}" where userID = ${userId}`
    db.query(sqlQuery, (err, result) => {
      if (err) throw err;
    })
  }
});

// RESET PASSWORD

  // Get the user's phase question
app.get("/selectedPhaseQuestion/:email", (req, res) => {
  const email = req.params.email;
  try {
    const qry = `select pq.* from password_generator.phase_questions pq join password_generator.user u on u.question = pq.questionsID or u.question2 = pq.questionsID where u.Email= ?`
    db.query(qry, email, (err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  } catch (error) {
    console.log(error);
  }
})

  // Verify the user's phase question & answer
app.post("/comparedPhaseAnswer", (req, res) => {
  const email = req.body.email
  const questionNumber = req.body.questionNumber
  const phaseAnswer = req.body.phaseAnswer

  try{
    const qry = `SELECT Email FROM user WHERE email=? and ((question=? and answer=?) or (question2=? and answer2=?));`
    db.query(qry, [email, questionNumber, phaseAnswer, questionNumber, phaseAnswer], (err, result) => {
      if(err) throw err
      res.send(result)
    })
  }catch(error){
    console.log(error)
  }
})

  // Update/Reset the password
app.post("/resetPassword", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  try{
    bcrypt.hash(password, saltRounds, (err, hash) => {
      const qry = "UPDATE user SET Password=? WHERE Email=?"
      db.query(qry, [hash, email], (err, result) => {
        if(err) throw err
        res.send(result)
      })
    })
  }catch(error){
    console.log(error)
  }
})


// PASSWORD GENERATOR

  // GET THE QUESTIONS
app.get("/generatorQuestion", (req, res) => {
  try {
    const qry = `SELECT * FROM password_generator.generator_questions;`
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  } catch (error) {
    console.log(error);
  }
})

// CHECK IF THE SERVER IS RUNNING
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});


// THIS IS FROM THE VIDEO

// app.post("/create", (req, res) => {
//   const name = req.body.name;
//   const age = req.body.age;
//   const country = req.body.country;
//   const position = req.body.position;
//   const wage = req.body.wage;

//   db.query(
//     "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
//     [name, age, country, position, wage],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });

// app.get("/employees", (req, res) => {
//   db.query("SELECT * FROM employees", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.put("/update", (req, res) => {
//   const id = req.body.id;
//   const wage = req.body.wage;
//   db.query(
//     "UPDATE employees SET wage = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });
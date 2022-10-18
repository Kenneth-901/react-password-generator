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
  methods: ["GET", "POST"],
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

app.post("/create", async (req, res) => {
  
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;
  const phoneNumber = req.body.phoneNumber;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if(err) throw err;

    const list = "SELECT * FROM password_generator.user"
    db.query(list, (err, result) => {
      const existEmail = result.map(e => e.Email).includes(email);
      if (existEmail) {
        res.send(existEmail);
      } else {
        db.query("INSERT INTO user (First_Name, Last_Name, Email, Password, DOB, Phone_Number, Created) VALUES (?, ?, ?, ?, ?, ?, current_timestamp())", [firstName, lastName, email, hash, dob, phoneNumber], (err, result) => {
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

app.get("/isUserAuth", verifyJWT, (req, res) => {
  // res.send("Authentication successful")
  res.json({
    auth: true,
    message: "Authentication successful"
  })
})

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
    res.send(result);
  } catch (error) {
    console.log(error);
    res.end();
  }
})


app.get("/account", async (req, res) => {

  db.getConnection( (err, conn) => {
    if (err) throw err;

    try {
      const qry = `SELECT * FROM password_generator.user`
      conn.query(qry, (err, result) => {
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
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(cors())

// app.use(cors({
//   origin: ["http://localhost:3000"],
//   methods: ["GET", "POST"],
//   credentials: true,
// }));
app.use(express.json());


const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: 3306,
  password: "password_generator",
  database: "password_generator"
});

// INSERT INTO user (First_Name, Last_Name, Email, Password, DOB, Phone_Number, Created2) VALUES ('HO', 'TUNG', 'h@gamil.com', 'abc123', '1-11-1111', '0101112345', current_timestamp())

app.post("/create", (req, res) => {
  
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;
  const phoneNumber = req.body.phoneNumber;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if(err){
      console.log(err)
    }
    
    db.query("INSERT INTO user (First_Name, Last_Name, Email, Password, DOB, Phone_Number, Created) VALUES (?, ?, ?, ?, ?, ?, current_timestamp())", [firstName, lastName, email, hash, dob, phoneNumber], (err, result) => {
      console.log(err)
      // if(err){
      //   console.log(err)
      // }else{
      //   res.send("Values Added")
      // }
    })
  })

  // THIS IS FOR THE "test" TABLE

  // const name = req.body.name

  // db.query("INSERT INTO test (meter) VALUES (?)", name, (err, result) => {
  //   console.log(err)
  // })
  

})

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE Email = ?;",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
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



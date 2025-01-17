//const { rootShouldForwardProp } = require("@mui/material/styles/styled");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
//dbOperation = require("./dbFiles/dbOperation");

const db = mysql.createConnection({
  user: process.env.REACT_APP_DB_USER,
  host: process.env.REACT_APP_DB_HOST,
  password: process.env.REACT_APP_DB_PASS,
  database: process.env.REACT_APP_DB_DATA,
});

const API_PORT = process.env.PORT || 5000;

/*
let advanceStudentID = "";
let surname = "";
let firstName = "";
let gender = "";
let nationality = "";
let emailHEI = "";
let emailPersonal = "";
let auth = "";
let address1 = "";
let address2 = "";
let address3 = "";
let address4 = "";
let universityID = 0;
let uniStudentID = "";
let timeBasis = "";
let cohort = "";
let startDate = "";
let endDate = "";
let regStatus = "";
let degreeType = "";
let degreeDuration = 0;
let projectTitle = "";
let projectAbstract = "";
let registrationMonth = "";
let vivaDate = "";
let profilePic = "";
*/

var sqlStudent =
  "INSERT INTO AdvanceStudent (advanceStudentID, surname, firstName, gender, nationality, emailHEI, emailPersonal, auth, address1, address2, address3, address4, universityID, uniStudentID, timeBasis, cohort, startDate, endDate, regStatus, degreeType, degreeDuration, projectTitle, projectAbstract, registrationMonth, vivaDate, profileImage, bio, isStudent, isSupervisor, isAdmin, isExec, isDirector) VALUES (?)";

var sqlUpdateStudent = `UPDATE AdvanceStudent SET (advanceStudentID, surname, firstName, gender, nationality, emailHEI, emailPersonal, auth, address1, address2, address3, address4, universityID, uniStudentID, timeBasis, cohort, startDate, endDate, regStatus, degreeType, degreeDuration, projectTitle, projectAbstract, registrationMonth, vivaDate, profileImage, bio, isStudent, isSupervisor, isAdmin, isExec, isDirector) WHERE advanceStudentID LIKE (?)`;

var sqlSupervisor =
  "INSERT INTO AdvanceSupervisor (advanceSupervisorID, title, surname, firstName, gender, nationality, email, auth, universityID, department, profileImage, bio, isStudent, isSupervisor, isAdmin, isExec, isDirector) VALUES (?)";

var sqlSupervisorRelationship =
  "INSERT INTO SupervisorRelationship (advanceSupervisorID, advanceStudentID, relation) VALUES (?)";

var sqlPoster =
  "INSERT INTO Poster (posterID, title, url, image, advanceStudentID) VALUES (?)";

var sqlNewsletter =
  "INSERT INTO Newsletter (newsletterID, title, url, image, publicationDate) VALUES (?)";

var sqlSearchStudent =
  "SELECT * FROM AdvanceStudent WHERE advanceStudentID LIKE (?)";

app.use(cors());
app.use(express.json());

app.post("/addstudent", function (req, res) {
  const values = [
    req.body.advanceStudentID,
    req.body.surname,
    req.body.firstName,
    req.body.gender,
    req.body.nationality,
    req.body.emailHEI,
    req.body.emailPersonal,
    req.body.auth,
    req.body.address1,
    req.body.address2,
    req.body.address3,
    req.body.address4,
    req.body.universityID,
    req.body.uniStudentID,
    req.body.timeBasis,
    req.body.cohort,
    req.body.startDate,
    req.body.endDate,
    req.body.regStatus,
    req.body.degreeType,
    req.body.degreeDuration,
    req.body.projectTitle,
    req.body.projectAbstract,
    req.body.registrationMonth,
    req.body.vivaDate,
    req.body.profileImage,
    req.body.bio,
    req.body.isStudent,
    req.body.isSupervisor,
    req.body.isAdmin,
    req.body.isExec,
    req.body.isDirector,
  ];
  console.log(req.body.surname);
  db.query(sqlStudent, [values], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
});
//   const sqlNewUpdateStudent = `UPDATE AdvanceStudent SET surname = ${req.body.surname}, firstName = ${req.body.firstName}, gender = ${req.body.gender}, nationality = ${req.body.nationality}, emailHEI = ${req.body.emailHEI}, emailPersonal = ${req.body.emailPersonal}, auth = ${req.body.auth}, address1 = ${req.body.address1}, address2 = ${req.body.address2}, address3 = ${req.body.address3}, address4 = ${req.body.address4}, universityID = ${req.body.universityID}, uniStudentID = ${req.body.uniStudentID}, timeBasis = ${req.body.timeBasis}, cohort = ${req.body.cohort}, startDate = ${req.body.startDate}, endDate = ${req.body.endDate}, regStatus = ${req.body.regStatus}, degreeType = ${req.body.degreeType}, degreeDuration = ${req.body.degreeDuration}, projectTitle = ${req.body.projectTitle}, projectAbstract = ${req.body.projectAbstract}, registrationMonth = ${req.body.registrationMonth}, vivaDate = ${req.body.vivaDate}, profileImage = ${req.body.profileImage}, bio = ${req.body.bio}, isStudent = ${req.body.isStudent}, isSupervisor = ${req.body.isSupervisor}, isAdmin = ${req.body.isAdmin}, isExec = ${req.body.isExec}, isDirector = ${req.body.isDirector} WHERE advanceStudentID = ${req.body.advanceStudentID};`;

app.post("/updatestudent", function (req, res) {
  const values = [
    req.body.advanceStudentID,
    req.body.surname,
    req.body.firstName,
    req.body.gender,
    req.body.nationality,
    req.body.emailHEI,
    req.body.emailPersonal,
    req.body.auth,
    req.body.address1,
    req.body.address2,
    req.body.address3,
    req.body.address4,
    req.body.universityID,
    req.body.uniStudentID,
    req.body.timeBasis,
    req.body.cohort,
    req.body.startDate,
    req.body.endDate,
    req.body.regStatus,
    req.body.degreeType,
    req.body.degreeDuration,
    req.body.projectTitle,
    req.body.projectAbstract,
    req.body.registrationMonth,
    req.body.vivaDate,
    req.body.profileImage,
    req.body.bio,
    req.body.isStudent,
    req.body.isSupervisor,
    req.body.isAdmin,
    req.body.isExec,
    req.body.isDirector,
  ];
  const sqlNewUpdateStudent = `UPDATE AdvanceStudent SET ? WHERE advanceStudentID = ?`;
  db.query(
    sqlNewUpdateStudent,
    [{ surname: req.body.surname }, req.body.advanceStudentID],
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body.surname);
        console.log(req.body);
      }
    }
  );
});

app.post("/searchstudent", function (req, res) {
  const values = [req.body.advanceStudentID];
  db.query(sqlSearchStudent, [values], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.post("/searchsupervisor", function (req, res) {
  const values = [req.body.advanceSupervisorID];
  db.query(sqlSearchSupervisor, [values], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.post("/addsupervisor", function (req, res) {
  const values = [
    req.body.advanceSupervisorID,
    req.body.title,
    req.body.surname,
    req.body.firstName,
    req.body.gender,
    req.body.nationality,
    req.body.email,
    req.body.auth,
    req.body.universityID,
    req.body.department,
    req.body.profileImage,
    req.body.bio,
    req.body.isStudent,
    req.body.isSupervisor,
    req.body.isAdmin,
    req.body.isExec,
    req.body.isDirector,
  ];
  console.log(req.body.surname);
  db.query(sqlSupervisor, [values], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
});

app.post("/addsupervisorrelationship", function (req, res) {
  const values = [
    req.body.advanceSupervisorID,
    req.body.advanceStudentID,
    req.body.relation,
  ];
  db.query(sqlSupervisorRelationship, [values], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
});

app.post("/addposter", function (req, res) {
  const values = [
    req.body.posterID,
    req.body.title,
    req.body.url,
    req.body.image,
    req.body.advanceStudentID,
  ];
  db.query(sqlSupervisorRelationship, [values], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
});

app.post("/addposter", function (req, res) {
  const values = [
    req.body.posterID,
    req.body.title,
    req.body.url,
    req.body.image,
    req.body.advanceStudentID,
  ];
  db.query(sqlPoster, [values], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
});

app.post("/addnewsletter", function (req, res) {
  const values = [
    req.body.newsletterID,
    req.body.title,
    req.body.url,
    req.body.image,
    req.body.publicationDate,
  ];
  db.query(sqlNewsletter, [values], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
});

app.get("/api", function (req, res) {
  console.log("called");
  res.send({ result: "Hello" });
});

app.get("/getsupervisors", (req, res) => {
  db.query("SELECT * FROM AdvanceSupervisor", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getnewsletters", (req, res) => {
  db.query("SELECT * FROM Newsletter", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getposters", (req, res) => {
  db.query("SELECT * FROM Poster", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getsupervisorrelationship", (req, res) => {
  db.query("SELECT * FROM SupervisorRelationship", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getuniversities", (req, res) => {
  db.query("SELECT * FROM AdvanceSupervisor", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getcountries", (req, res) => {
  db.query("SELECT * FROM Countries", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getstudents", (req, res) => {
  db.query("SELECT * FROM AdvanceStudent", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/quit", function (req, res) {
  console.log("called");
  res.send({ result: "Goodbye!" });
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

// dbOperation.getStudents().then((response) => {
//   console.log(response);
// });

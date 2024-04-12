import React, { useRef, useState, useEffect } from "react";
import axios, { Axios } from "axios";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    spacing: 2,
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardaction: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: 20,
    height: "100%",

    //height: "70vh",
    //width: "50%",
    margin: "20px auto",
  },
});

//need to fix validation

export default function StudentUpload() {
  const [fileProgress, setFileProgress] = useState(0);
  const [students, setStudents] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const navigate = useNavigate();
  const classes = useStyles();

  async function uploadFileHandler(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      let student = [];

      let newLinebrk = data.split("\r\n");
      for (let i = 1; i < newLinebrk.length; i++) {
        let parsedata = [];
        let newTabBreak = newLinebrk[i].split("\t");
        for (let j = 0; j < newTabBreak.length; j++) {
          parsedata.push(newTabBreak[j]);
        }
        student.push(parsedata);
        console.log(student);
      }
      setStudents(student);
      console.log(students);
      //console.log("parsedData: ", student);
    };
    reader.readAsText(e.target[0].files[0]);
    // const file = e.target[0].files[0];
    // uploadFile(file);
  }

  async function handleUploadStudentsClick(e) {
    e.preventDefault();
    console.log(students);

    for (var i = 0; i < students.length - 1; i++) {
      const uid = uuidv4().toString();
      const uid2 = uuidv4().toString();
      const startDate = students[i][14];
      const endDate = students[i][15];
      const vivaDate = students[i][22];
      const newStartDate = startDate.split("/").reverse().join("-");
      const newEndDate = endDate.split("/").reverse().join("-");
      const newVivaDate = vivaDate.split("/").reverse().join("-");

      console.log(
        "Student " + i + "is " + students[i][1] + " " + students[i][0]
      );
      axios
        .post("https://advanceserver-45066d4d7734.herokuapp.com/addStudent", {
          advanceStudentID: uid,
          surname: students[i][0],
          firstName: students[i][1],
          gender: students[i][2],
          nationality: students[i][3],
          emailHEI: students[i][4],
          emailPersonal: students[i][5],
          auth: uid2,
          address1: students[i][6],
          address2: students[i][7],
          address3: students[i][8],
          address4: students[i][9],
          universityID: students[i][10],
          uniStudentID: students[i][11],
          timeBasis: students[i][12],
          cohort: students[i][13],
          startDate: newStartDate,
          endDate: newEndDate,
          regStatus: students[i][16],
          degreeType: students[i][17],
          degreeDuration: students[i][18],
          projectTitle: students[i][19],
          projectAbstract: students[i][20],
          registrationMonth: students[i][21],
          vivaDate: newVivaDate,
          profileImage: students[i][23],
          bio: students[i][24],
          isStudent: true,
          isSupervisor: false,
          isAdmin: false,
          isExec: false,
          isDirector: false,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Upload Students</Typography>
      <Stack spacing={2}>
        <form onSubmit={uploadFileHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload File</button>
        </form>
        <CircularProgress variant="determinate" value={fileProgress} />

        <Button
          variant="contained"
          onClick={handleUploadStudentsClick}
          fullWidth
        >
          Upload Students
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
}

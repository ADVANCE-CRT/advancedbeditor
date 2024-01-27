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

export default function SupervisorUpload() {
  const [fileProgress, setFileProgress] = useState(0);
  const [supervisors, setSupervisors] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const navigate = useNavigate();
  const classes = useStyles();

  async function uploadFileHandler(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      let supervisor = [];

      let newLinebrk = data.split("\r\n");
      for (let i = 1; i < newLinebrk.length; i++) {
        let parsedata = [];
        let newTabBreak = newLinebrk[i].split("\t");
        for (let j = 0; j < newTabBreak.length; j++) {
          parsedata.push(newTabBreak[j]);
        }
        supervisor.push(parsedata);
        console.log(supervisor);
      }
      setSupervisors(supervisor);
      console.log(supervisors);
      //console.log("parsedData: ", student);
    };
    reader.readAsText(e.target[0].files[0]);
    // const file = e.target[0].files[0];
    // uploadFile(file);
  }

  async function handleUploadSupervisorsClick(e) {
    e.preventDefault();
    console.log(supervisors);

    for (var i = 0; i < supervisors.length - 1; i++) {
      const uid = uuidv4().toString();
      const uid2 = uuidv4().toString();
      console.log(
        "Supervisor " + i + "is " + supervisors[i][1] + " " + supervisors[i][0]
      );
      axios
        .post("http://localhost:5000/addsupervisor", {
          advanceSupervisorID: uid,
          title: supervisors[i][0],
          surname: supervisors[i][1],
          firstName: supervisors[i][2],
          gender: supervisors[i][3],
          nationality: supervisors[i][4],
          email: supervisors[i][5],
          auth: uid2,
          universityID: supervisors[i][6],
          department: supervisors[i][7],
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
      <Typography variant="h5">Upload supervisors</Typography>
      <Stack spacing={2}>
        <form onSubmit={uploadFileHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload File</button>
        </form>
        <CircularProgress variant="determinate" value={fileProgress} />

        <Button
          variant="contained"
          onClick={handleUploadSupervisorsClick}
          fullWidth
        >
          Upload Supervisors
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
}

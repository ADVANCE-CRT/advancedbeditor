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
  const [posters, setPosters] = useState([]);

  const navigate = useNavigate();
  const classes = useStyles();

  async function uploadFileHandler(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      let poster = [];

      let newLinebrk = data.split("\r\n");
      for (let i = 1; i < newLinebrk.length; i++) {
        let parsedata = [];
        let newTabBreak = newLinebrk[i].split("\t");
        for (let j = 0; j < newTabBreak.length; j++) {
          parsedata.push(newTabBreak[j]);
        }
        poster.push(parsedata);
        console.log(poster);
      }
      setPosters(poster);
      console.log(posters);
      //console.log("parsedData: ", student);
    };
    reader.readAsText(e.target[0].files[0]);
    // const file = e.target[0].files[0];
    // uploadFile(file);
  }

  async function handleUploadPostersClick(e) {
    e.preventDefault();
    console.log(posters);

    for (var i = 0; i < posters.length - 1; i++) {
      const uid = uuidv4().toString();

      axios
        .post("http://localhost:5000/addposter", {
          posterID: uid,
          title: posters[i][0],
          url: posters[i][1],
          image: posters[i][2],
          advanceStudentID: posters[i][3],
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
      <Typography variant="h5">Upload poster data</Typography>
      <Stack spacing={2}>
        <form onSubmit={uploadFileHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload File</button>
        </form>
        <CircularProgress variant="determinate" value={fileProgress} />

        <Button
          variant="contained"
          onClick={handleUploadPostersClick}
          fullWidth
        >
          Upload Posters
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
}

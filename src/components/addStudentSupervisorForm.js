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
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CircularProgress from "@mui/material/CircularProgress";

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

export default function AddStudentSupervisorForm(props) {
  const uid = uuidv4().toString();
  const uid2 = uuidv4().toString();
  const [advanceStudentID, setAdvanceStudentID] = useState("");
  const [student, setStudent] = useState("");
  const [supervisor, setSupervisor] = useState(null);
  const [supervisorName, setSupervisorName] = useState("");
  const { studentId } = useParams();
  const [advanceSupervisorID, setAdvanceSupervisorID] = useState("");
  const [relation, setRelation] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const classes = useStyles();

  const defaultProps = {
    options: props.props,
    getOptionLabel: (option) =>
      option.surname +
      ", " +
      option.firstName +
      "_" +
      option.advanceSupervisorID.toString(),
  };
  const flatProps = {
    options: props.props.map(
      (option) =>
        option.surname +
        ", " +
        option.firstName +
        "_" +
        option.advanceSupervisorID.toString()
    ),
  };

  /*
  useEffect(() => {
    const getSupervisors = () => {
      axios.get("http://localhost:5000/getsupervisors").then((response) => {
        setSupervisorList(response.data);
      });
    };

    getSupervisors();
  }, []);
  */
  async function changeHandler(e) {
    //console.log(props.props);
    //e.preventDefault();
    setSupervisorName(e);
    console.log(supervisorName);
  }

  async function handleAddStudentSupervisorClick(e) {
    e.preventDefault();
    const supervisorIDArray = supervisorName.split("_");
    const supervisorID = supervisorIDArray[1];
    console.log(supervisorID);
    console.log(studentId);
    console.log(relation);

    axios
      .post(
        "https://advanceserver-45066d4d7734.herokuapp.com/addsupervisorrelationship",
        {
          advanceStudentID: studentId,
          advanceSupervisorID: supervisorID,
          relation: relation,
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });

    const getStudentSupervisors = () => {
      axios
        .get(
          "https://advanceserver-45066d4d7734.herokuapp.com/getsupervisorrelationship"
        )
        .then((response) => {
          console.log(response.data);
        });
    };
    getStudentSupervisors();
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Add Student Relationship</Typography>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Primary"
            name="radio-buttons-group"
            onChange={(e) => setRelation(e.target.value)}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="Primary"
              onChange={(e) => setRelation(e.target.value)}
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Co-Supervisor"
              onChange={(e) => setRelation(e.target.value)}
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Advisor"
              onChange={(e) => setRelation(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
        <Autocomplete
          {...defaultProps}
          id="supervisorName"
          clearOnEscape
          inputValue={supervisorName}
          onInputChange={(e, newSupervisorName) =>
            setSupervisorName(newSupervisorName)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              id="supervisorName"
              label="Supervisor Name"
              variant="standard"
            />
          )}
        />
        <Typography color={"red"}>{errorMessage}</Typography>
        <Button
          variant="contained"
          onClick={handleAddStudentSupervisorClick}
          fullWidth
        >
          Add Relationship
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
}

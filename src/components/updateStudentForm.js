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
import { useNavigate } from "react-router-dom";

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

export default function UpdateStudentForm(props) {
  const advanceStudent = props.props;
  console.log();
  const [advanceStudentID, setAdvanceStudentID] = useState(
    advanceStudent.advanceStudentID
  );
  const [firstName, setFirstName] = useState(advanceStudent.firstName);
  const [surname, setSurname] = useState(advanceStudent.surname);
  const [gender, setGender] = useState(advanceStudent.gender);
  const [nationality, setNationality] = useState(advanceStudent.nationality);
  const [emailHEI, setEmailHEI] = useState(advanceStudent.emailHEI);
  const [emailPersonal, setEmailPersonal] = useState(
    advanceStudent.emailPersonal
  );
  const [auth, setAuth] = useState(advanceStudent.auth);
  const [firstAddress, setFirstAddress] = useState(advanceStudent.firstAddress);
  const [secondAddress, setSecondAddress] = useState(
    advanceStudent.secondAddress
  );
  const [thirdAddress, setThirdAddress] = useState(advanceStudent.thirdAddress);
  const [fourthAddress, setFourthAddress] = useState(
    advanceStudent.fourthAddress
  );
  const [universityID, setUniversityID] = useState(advanceStudent.universityID);
  const [uniStudentID, setUniStudentID] = useState(advanceStudent.uniStudentID);
  const [timeBasis, setTimeBasis] = useState(advanceStudent.timeBasis);
  const [cohort, setCohort] = useState(advanceStudent.cohort);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(advanceStudent.startDate);
  const [endDate, setEndDate] = useState(advanceStudent.endDate);
  const [regStatus, setRegStatus] = useState(advanceStudent.regStatus);
  const [degreeType, setDegreeType] = useState(advanceStudent.degreeType);
  const [degreeDuration, setDegreeDuration] = useState(
    advanceStudent.degreeDuration
  );
  const [projectTitle, setProjectTitle] = useState(advanceStudent.projectTitle);
  const [projectAbstract, setProjectAbstract] = useState(
    advanceStudent.projectAbstract
  );
  const [registrationMonth, setRegistrationMonth] = useState(
    advanceStudent.registrationMonth
  );
  const [vivaDate, setVivaDate] = useState(advanceStudent.vivaDate);
  const [profileImage, setProfileImage] = useState(advanceStudent.profileImage);
  const [bio, setBio] = useState(advanceStudent.bio);

  const [countryList, setCountryList] = useState([]);

  const navigate = useNavigate();
  const classes = useStyles();

  const defaultProps = {
    options: countryList,
    getOptionLabel: (option) => option.country,
  };
  const flatProps = {
    options: countryList.map((option) => option.country),
  };

  useEffect(() => {
    const getCountries = () => {
      axios.get("http://localhost:5000/getcountries").then((response) => {
        setCountryList(response.data);
      });
    };

    getCountries();
  }, []);

  async function handleAddStudentClick(e) {
    console.log(surname);
    e.preventDefault();
    axios
      .post("http://localhost:5000/updatestudent", {
        advanceStudentID: advanceStudentID,
        surname: surname,
        firstName: firstName,
        gender: gender,
        nationality: nationality,
        emailHEI: emailHEI,
        emailPersonal: emailPersonal,
        auth: auth,
        address1: firstAddress,
        address2: secondAddress,
        address3: thirdAddress,
        address4: fourthAddress,
        universityID: universityID,
        uniStudentID: uniStudentID,
        timeBasis: timeBasis,
        cohort: cohort,
        startDate: startDate,
        endDate: endDate,
        regStatus: regStatus,
        degreeType: degreeType,
        degreeDuration: degreeDuration,
        projectTitle: projectTitle,
        projectAbstract: projectAbstract,
        registrationMonth: registrationMonth,
        vivaDate: vivaDate,
        profileImage: profileImage,
        bio: bio,
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
    navigate("/studentlist");
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Create a Destination</Typography>
      <Stack spacing={2}>
        <TextField
          id="surname"
          label="Surname"
          variant="standard"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
        />
        <TextField
          id="firstName"
          label="FirstName"
          variant="standard"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={gender}
            name="radio-buttons-group"
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
              onChange={(e) => setGender(e.target.value)}
            />
            <FormControlLabel
              value="Male"
              control={<Radio />}
              label="Male"
              onChange={(e) => setGender(e.target.value)}
            />
            <FormControlLabel
              value="N/A"
              control={<Radio />}
              label="Other"
              onChange={(e) => setGender(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
        <Autocomplete
          {...defaultProps}
          id="Nationality"
          defaultValue={nationality}
          inputValue={nationality}
          onInputChange={(e, newNationality) => setNationality(newNationality)}
          renderInput={(params) => (
            <TextField
              {...params}
              id="nationality"
              label="Nationality"
              variant="standard"
            />
          )}
        />
        <TextField
          id="emailhei"
          label="University Email"
          variant="standard"
          value={emailHEI}
          onChange={(e) => setEmailHEI(e.target.value)}
          fullWidth
        />
        <TextField
          id="emailpersonal"
          label="Personal Email"
          variant="standard"
          value={emailPersonal}
          onChange={(e) => setEmailPersonal(e.target.value)}
          fullWidth
        />
        <TextField
          id="address1"
          label="Address Line 1"
          variant="standard"
          value={firstAddress}
          onChange={(e) => setFirstAddress(e.target.value)}
          fullWidth
        />
        <TextField
          id="address2"
          label="Address Line 2"
          variant="standard"
          value={secondAddress}
          onChange={(e) => setSecondAddress(e.target.value)}
          fullWidth
        />
        <TextField
          id="address3"
          label="Address Line 3"
          variant="standard"
          value={thirdAddress}
          onChange={(e) => setThirdAddress(e.target.value)}
          fullWidth
        />
        <TextField
          id="address4"
          label="Address Line 4"
          variant="standard"
          value={fourthAddress}
          onChange={(e) => setFourthAddress(e.target.value)}
          fullWidth
        />
        <TextField
          id="unversityID"
          type="number"
          label="University ID"
          variant="standard"
          value={universityID}
          onChange={(e) => setUniversityID(e.target.value)}
          fullWidth
        />
        <TextField
          id="universityStudentID"
          label="Student ID"
          variant="standard"
          value={uniStudentID}
          onChange={(e) => setUniStudentID(e.target.value)}
          fullWidth
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Time Basis</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={timeBasis}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Full-Time"
              control={<Radio />}
              label="Full-Time"
              onChange={(e) => setTimeBasis(e.target.value)}
            />
            <FormControlLabel
              value="Part-Time"
              control={<Radio />}
              label="Part-Time"
              onChange={(e) => setTimeBasis(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Cohort</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={cohort}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="2020"
              control={<Radio />}
              label="2020"
              onChange={(e) => setCohort(e.target.value)}
            />
            <FormControlLabel
              value="2021"
              control={<Radio />}
              label="2021"
              onChange={(e) => setCohort(e.target.value)}
            />
            <FormControlLabel
              value="2022"
              control={<Radio />}
              label="2022"
              onChange={(e) => setCohort(e.target.value)}
            />
            <FormControlLabel
              value="2023"
              control={<Radio />}
              label="2023"
              onChange={(e) => setCohort(e.target.value)}
            />
            <FormControlLabel
              value="2024"
              control={<Radio />}
              label="2024"
              onChange={(e) => setCohort(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="startDate"
          label="Start Date"
          variant="standard"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
        />
        <TextField
          id="endDate"
          label="End Date"
          variant="standard"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Registration Status
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={regStatus}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Registered"
              control={<Radio />}
              label="Registered"
              onChange={(e) => setRegStatus(e.target.value)}
            />
            <FormControlLabel
              value="Unregistered"
              control={<Radio />}
              label="Unregistered"
              onChange={(e) => setRegStatus(e.target.value)}
            />
            <FormControlLabel
              value="Graduated"
              control={<Radio />}
              label="Gradated"
              onChange={(e) => setRegStatus(e.target.value)}
            />
            <FormControlLabel
              value="Cancelled"
              control={<Radio />}
              label="Cancelled"
              onChange={(e) => setRegStatus(e.target.value)}
            />
            <FormControlLabel
              value="Departed"
              control={<Radio />}
              label="Departed"
              onChange={(e) => setRegStatus(e.target.value)}
            />
            <FormControlLabel
              value="LoA"
              control={<Radio />}
              label="LoA"
              onChange={(e) => setRegStatus(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Degree Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={degreeType}
            name="radio-buttons-group"
            onChange={(e) => setDegreeType(e.target.value)}
          >
            <FormControlLabel
              value="PhD"
              control={<Radio />}
              label="PhD"
              onChange={(e) => setDegreeType(e.target.value)}
            />
            <FormControlLabel
              value="MSc"
              control={<Radio />}
              label="MSc"
              onChange={(e) => setDegreeType(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="degreeDuration"
          label="Degree Duration (Just enter numerical value)"
          variant="standard"
          value={degreeDuration}
          onChange={(e) => setDegreeDuration(e.target.value)}
          fullWidth
        />
        <TextField
          id="projectTitle"
          label="Project Title"
          variant="standard"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          fullWidth
        />
        <TextField
          id="projectAbstract"
          label="Project Abstract"
          variant="standard"
          value={projectAbstract}
          onChange={(e) => setProjectAbstract(e.target.value)}
          fullWidth
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Registration Month
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={registrationMonth}
            name="radio-buttons-group"
            onChange={(e) => setRegistrationMonth(e.target.value)}
          >
            <FormControlLabel
              value="January"
              control={<Radio />}
              label="January"
              onChange={(e) => setRegistrationMonth(e.target.value)}
            />
            <FormControlLabel
              value="April"
              control={<Radio />}
              label="April"
              onChange={(e) => setRegistrationMonth(e.target.value)}
            />
            <FormControlLabel
              value="July"
              control={<Radio />}
              label="July"
              onChange={(e) => setRegistrationMonth(e.target.value)}
            />
            <FormControlLabel
              value="October"
              control={<Radio />}
              label="October"
              onChange={(e) => setRegistrationMonth(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="vivaDate"
          label="Viva Date"
          variant="standard"
          value={vivaDate}
          onChange={(e) => setVivaDate(e.target.value)}
          fullWidth
        />
        <TextField
          id="profileImage"
          label="Profile Image"
          variant="standard"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          fullWidth
        />
        <TextField
          id="bio"
          label="Student Bio"
          variant="standard"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          fullWidth
        />
        <Typography color={"red"}>{errorMessage}</Typography>
        <Button variant="contained" onClick={handleAddStudentClick} fullWidth>
          Add Student
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
}

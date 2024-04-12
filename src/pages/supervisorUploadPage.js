import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import PersonTable from "../components/personTable";
import axios, { Axios } from "axios";
import NavigationDrawer from "../components/navigationDrawer";
import SupervisorUpload from "../components/supervisorUpload";

const useStyles = makeStyles({
  container: {
    //backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  },
});

const SupervisorUploadPage = () => {
  const classes = useStyles();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const getStudents = () => {
      axios
        .get("https://advanceserver-45066d4d7734.herokuapp.com/getstudents")
        .then((response) => {
          setStudentList(response.data);
        });
    };
    getStudents();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <NavigationDrawer title={"Upload Supervisors"} />

        {studentList && <SupervisorUpload />}
      </div>
    </>
  );
};

export default SupervisorUploadPage;

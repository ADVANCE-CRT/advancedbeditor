import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";

import PersonTable from "../components/personTable";
import axios, { Axios } from "axios";
import NavigationDrawer from "../components/navigationDrawer";
import AddStudentSupervisorForm from "../components/addStudentSupervisorForm";

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

const AddStudentSupervisorPage = () => {
  const classes = useStyles();
  const [supervisorList, setSupervisorList] = useState([]);
  const { studentId } = useParams();
  const [student, setStudent] = useState();

  useEffect(() => {
    console.log(studentId);
    axios
      .post("http://localhost:5000/searchstudent", {
        advanceStudentID: studentId,
      })
      .then(function (response) {
        console.log(response.data);
        setStudent(response.data[0]);
        //setStudent(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
    console.log(student);
  }, []);

  useEffect(() => {
    const getSupervisors = () => {
      axios.get("http://localhost:5000/getsupervisors").then((response) => {
        setSupervisorList(response.data);
      });
    };
    getSupervisors();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <NavigationDrawer title={"Test"} />

        {supervisorList && <AddStudentSupervisorForm props={supervisorList} />}
      </div>
    </>
  );
};

export default AddStudentSupervisorPage;

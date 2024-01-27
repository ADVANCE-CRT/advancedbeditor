import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import PersonTable from "../components/personTable";
import axios, { Axios } from "axios";
import NavigationDrawer from "../components/navigationDrawer";
import AddStudentForm from "../components/addStudentForm";

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

const AddStudentPage = () => {
  const classes = useStyles();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const getStudents = () => {
      axios.get("http://localhost:5000/getstudents").then((response) => {
        setStudentList(response.data);
      });
    };
    getStudents();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <NavigationDrawer title={"Add Student"} />

        {studentList && <AddStudentForm />}
      </div>
    </>
  );
};

export default AddStudentPage;

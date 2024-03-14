import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import PersonTable from "../components/personTable";
import axios, { Axios } from "axios";
import NavigationDrawer from "../components/navigationDrawer";

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

const StudentListPage = () => {
  const classes = useStyles();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const getStudents = () => {
      console.log("here")
      axios.get("http://localhost:5000/getstudents").then((response) => {
        setStudentList(response.data);
        console.log(response.data)
      });
    };
    getStudents();
    console.log(studentList);
  }, []);

  return (
    <>
      <div className={classes.container}>
        <NavigationDrawer title={"ADVANCE CRT Students"} />

        {studentList && <PersonTable props={studentList} />}
      </div>
    </>
  );
};

export default StudentListPage;

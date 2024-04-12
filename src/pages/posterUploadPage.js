import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import axios, { Axios } from "axios";
import NavigationDrawer from "../components/navigationDrawer";
import PosterUpload from "../components/posterUpload";

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

const PosterUploadPage = () => {
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
        <NavigationDrawer title={"Test"} />

        {studentList && <PosterUpload />}
      </div>
    </>
  );
};

export default PosterUploadPage;

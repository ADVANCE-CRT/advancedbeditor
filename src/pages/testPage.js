import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import RelationshipTable from "../components/relationshipTable";
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

const TestPage = () => {
  const classes = useStyles();
  const [relationships, setRelationships] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [supervisorList, setSupervisorList] = useState([]);

  useEffect(() => {
    const getRelationships = () => {
      axios
        .get("http://localhost:5000/getsupervisorrelationship")
        .then((response) => {
          setRelationships(response.data);
        });
    };
    getRelationships();
    console.log(relationships);
  }, []);

  return (
    <>
      <div className={classes.container}>
        <NavigationDrawer title={"ADVANCE CRT Students"} />

        {studentList && <RelationshipTable props={relationships} />}
      </div>
    </>
  );
};

export default TestPage;

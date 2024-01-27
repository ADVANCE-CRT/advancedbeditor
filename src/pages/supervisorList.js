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

const SupervisorListPage = () => {
  const classes = useStyles();
  const [supervisorList, setSupervisorList] = useState([]);

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
        <NavigationDrawer title={"ADVANCE CRT Supervisors"} />

        {supervisorList && <PersonTable props={supervisorList} />}
      </div>
    </>
  );
};

export default SupervisorListPage;

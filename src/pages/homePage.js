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

const HomePage = () => {
  const classes = useStyles();
  const [supervisorList, setSupervisorList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const getCountries = () => {
      axios.get("http://localhost:5000/getcountries").then((response) => {
        setCountryList(response.data);
      });
    };

    getCountries();
    const getSupervisors = () => {
      axios.get("http://localhost:5000/getsupervisors").then((response) => {
        setSupervisorList(response.data);
        console.log(supervisorList);
        for (var i = 0; i <= supervisorList.length - 1; i++) {
          for (var j = 0; j <= countryList.length - 1; j++) {
            if (
              supervisorList[i].nationalityID === countryList.nationalityID[j]
            ) {
              console.log("success");
              supervisorList[i].nationality = countryList.nationality;
              console.log(supervisorList[i].nationality);
            }
          }
        }
        //setSupervisorList(supervisorList);
      });
    };
    getSupervisors();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <NavigationDrawer title={"Home"} />
        {supervisorList && <PersonTable props={supervisorList} />}
      </div>
    </>
  );
};

export default HomePage;

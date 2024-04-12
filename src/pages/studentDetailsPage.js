import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import NavigationDrawer from "../components/navigationDrawer";
import StudentDetailsCard from "../components/studentDetailsCard";

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

const StudentDetailsPage = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState();
  const classes = useStyles();

  useEffect(() => {
    console.log(studentId);
    axios
      .post("https://advanceserver-45066d4d7734.herokuapp.com/searchstudent", {
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

  return (
    <>
      <div className={classes.container}>
        {student && (
          <NavigationDrawer
            title={student.surname + ", " + student.firstName}
          />
        )}
        {student && <StudentDetailsCard props={student} />}
      </div>
    </>
  );
};

export default StudentDetailsPage;

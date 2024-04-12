import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";

export default function RelationshipTable(props) {
  const relationships = props.props;
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const students = [];

  async function handleDetailsClick(e) {
    console.log(e.target.value);
    console.log(student);
    //navigate(`/student/${e.target.value}`);
    //navigate(`/student/${e.target.value}`);
  }

  async function handleSuperVisorUpdateClick(e) {
    console.log(e.target.value);
    navigate(`/addstudentsupervisor/${e.target.value}`);
    //navigate(`/student/${e.target.value}`);
  }

  useEffect(() => {
    /*
    for (var i = 0; i <= relationships.length - 1; i++) {
      console.log(relationships[i].advanceStudentID);
    }
*/
    console.log(relationships);
    axios
      .post("https://advanceserver-45066d4d7734.herokuapp.com/searchstudent", {
        advanceStudentID: relationships.advanceStudentID,
      })
      .then(function (response) {
        console.log(response.data);
        setStudent(response.data);
        students.push(student);
        console.log(students);
        //setStudent(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
    console.log(student);
  }, []);

  return (
    <>
      {relationships && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Relationship</TableCell>
                <TableCell>AdvanceStudentID</TableCell>
                <TableCell>AdvanceSupervisorID</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relationships.map((relationships) => (
                <TableRow
                  key={
                    relationships.advanceStudentID +
                    relationships.advanceSupervisorID
                  }
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {relationships.relation}
                  </TableCell>
                  <TableCell>{relationships.advanceStudentID}</TableCell>
                  <TableCell>{relationships.advanceSupervisorID}</TableCell>
                  <TableCell>
                    <Button
                      value={relationships.advanceStudentID}
                      onClick={(e) => handleDetailsClick(e)}
                    >
                      Details
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      value={relationships.advanceStudentID}
                      onClick={(e) => handleSuperVisorUpdateClick(e)}
                    >
                      Update Supervisors
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

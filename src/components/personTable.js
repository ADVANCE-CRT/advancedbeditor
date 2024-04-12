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

export default function PersonTable(props) {
  const personList = props.props;
  const universities = [
    "names",
    "University College Cork",
    "Munter Technological University",
    "Trinity College Dublin",
    "TU Dublin",
    "Maynooth University",
  ];
  const navigate = useNavigate();

  async function handleDetailsClick(e) {
    console.log(e.target.value);
    navigate(`/student/${e.target.value}`);
    //navigate(`/student/${e.target.value}`);
  }

  async function handleStudentUpdateClick(e) {
    console.log(e.target.value);
    navigate(`/updatestudent/${e.target.value}`);
    //navigate(`/student/${e.target.value}`);
  }

  async function handleSuperVisorUpdateClick(e) {
    console.log(e.target.value);
    navigate(`/addstudentsupervisor/${e.target.value}`);
    //navigate(`/student/${e.target.value}`);
  }

  return (
    <>
      {personList && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>University</TableCell>

                <TableCell>Nationality</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personList.map((personList) => (
                <TableRow
                  key={personList.firstName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {personList.title}
                  </TableCell>

                  <TableCell>{personList.surname}</TableCell>
                  <TableCell>{personList.firstName}</TableCell>
                  <TableCell>{personList.gender}</TableCell>
                  <TableCell>{universities[personList.universityID]}</TableCell>
                  <TableCell>{personList.nationality}</TableCell>
                  <TableCell>
                    <Button
                      value={personList.advanceStudentID}
                      onClick={(e) => handleDetailsClick(e)}
                    >
                      Details
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      value={personList.advanceStudentID}
                      onClick={(e) => handleSuperVisorUpdateClick(e)}
                    >
                      Update Supervisors
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      value={personList.advanceStudentID}
                      onClick={(e) => handleStudentUpdateClick(e)}
                    >
                      Update Student
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

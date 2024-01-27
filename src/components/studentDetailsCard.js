import React, { useEffect } from "react";
import { makeStyles, styled } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    //width: "100%",
    //height: "65vh",
    margin: "10px",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function StudentDetailsCard(props) {
  const classes = useStyles();
  const student = props.props;
  const universities = [
    "names",
    "University College Cork",
    "Munter Technological University",
    "Trinity College Dublin",
    "TU Dublin",
    "Maynooth University",
  ];

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h8" component="div"></Typography>
        <Grid container rowSpacing={1} rowGap={1} columnGap={1}>
          <Grid xs={5}>
            <Item>
              <Typography variant="h6" color="text.secondary">
                Gender
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {student.gender}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={5}>
            <Item>
              <Typography variant="h6" color="text.secondary">
                Nationality
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {student.nationality}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={5}>
            <Item>
              <Typography variant="h6" color="text.secondary">
                Email
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {student.emailHEI}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={5}>
            <Item>
              <Typography variant="h6" color="text.secondary">
                University
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {universities[student.universityID]}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={5}>
            <Item>
              <Typography variant="h6" color="text.secondary">
                Full-Time/Part-Time
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {student.timeBasis}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={5}>
            <Item>
              <Typography variant="h6" color="text.secondary">
                Registration Status
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {student.regStatus}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={5}>
            <Item>
              <Typography variant="h6" color="text.secondary">
                Degree Type
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {student.degreeType}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={5}>
            <Item>
              <Typography variant="h6" color="text.secondary">
                Degree Duration
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {student.degreeDuration}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={10}>
            <Item>
              <Typography variant="h6" color="text.secondary">
                Project: {student.projectTitle}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Abstract: {student.projectAbstract}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={5}>
            <Item>
              <Typography variant="h6" color="text.secondary">
                Address
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {student.address1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {student.address2}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {student.address3}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {student.address4}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions></CardActions>
    </Card>
  );
}

export default StudentDetailsCard;

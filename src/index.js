import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import TestPage from "./pages/testPage";
import SupervisorListPage from "./pages/supervisorList";
import StudentListPage from "./pages/studentList";
import AddStudentPage from "./pages/addStudentPage";
import StudentUploadPage from "./pages/studentUploadPage";
import SupervisorUploadPage from "./pages/supervisorUploadPage";
import StudentDetailsPage from "./pages/studentDetailsPage";
import AddStudentSupervisorPage from "./pages/addStudentSupervisor";
//import { AuthProvider } from "./contexts/AuthContext";
//import PrivateRoute from "./components/privateRoute";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";

// async function getData(url) {
//   const newData = await fetch(url, {
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//       Accept: "application/json",
//     },
//   }).then((res) => res.json());
//   console.log(newData);
// }

// getData("/api");

const theme = createTheme({
  palette: {
    primary: {
      main: "#27AAE2",
    },
    text: {
      primary: "#413E77",
      //secondary: "#05C78D",
      disabled: "#06DB9B",
    },
    background: {
      paper: "#EFEAE6",
      default: "#EFEAE6",
    },
  },
  typography: {},
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/test" element={<TestPage />} />
          <Route exact path="/studentlist" element={<StudentListPage />} />
          <Route exact path="/addstudentpage" element={<AddStudentPage />} />
          <Route exact path="/studentupload" element={<StudentUploadPage />} />
          <Route
            exact
            path="/supervisorupload"
            element={<SupervisorUploadPage />}
          />

          <Route
            exact
            path="/student/:studentId"
            element={<StudentDetailsPage />}
          />
          <Route
            exact
            path="/addstudentsupervisor/:studentId"
            element={<AddStudentSupervisorPage />}
          />

          <Route
            exact
            path="/supervisorlist"
            element={<SupervisorListPage />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

reportWebVitals();
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

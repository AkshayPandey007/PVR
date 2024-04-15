import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./Routes/Private.Routes";
import { useDispatch } from "react-redux";

import "./app.scss";
import PublicRoute from "./Routes/Public.Route";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MovieSlot from "./Pages/MovieSlot/MovieSlot";
import SignUp from "./Pages/Login/SignUp";



function App() {

  


  return (
    <React.Fragment>
      <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/movie-slot/:id" element={<MovieSlot/>} />
        </Route>
      </Routes>

    </React.Fragment>
  );
}

export default App;

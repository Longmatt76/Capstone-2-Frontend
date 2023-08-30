import React from "react";
import { Routes, Route } from 'react-router-dom';
import LogIn from "../forms/LogIn";
import SignUpUser from "../forms/SignUpUser";
import SignUpOwner from "../forms/SignUpOwner";
import CreateStore from "../forms/CreateStore";
import Home from "../Home";



const AppRoutes = ({
  handleLogIn,
  handleUserSignUp,
  handleEditUserProfile,
  handleEditOwnerProfile,
  handleOwnerSignup,
}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn handleLogIn={handleLogIn} />} />
      <Route
        path="/register-user"
        element={<SignUpUser handleUserSignUp={handleUserSignUp} />}
      />
      <Route
        path="/register-owner"
        element={<SignUpOwner handleOwnerSignup={handleOwnerSignup} />}
      />
      <Route path="/create-store" element={<CreateStore />} />
    </Routes>
  );
};

export default AppRoutes; 
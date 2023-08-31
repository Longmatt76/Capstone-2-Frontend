import React from "react";
import { Routes, Route } from 'react-router-dom';
import LogIn from "../forms/LogIn";
import SignUpUser from "../forms/SignUpUser";
import SignUpOwner from "../forms/SignUpOwner";
import CreateStore from "../forms/CreateStore";
import EditUser from "../forms/EditUser";
import AddAddress from "../forms/AddAddress";
import Home from "../Home";
import EditAddress from "../forms/EditAddress";



const AppRoutes = ({
  handleLogIn,
  handleUserSignUp,
  handleEditUserProfile,
  handleEditOwnerProfile,
  handleOwnerSignup,
  handleUserAddress,
  handleUserEditAddress
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
        path="/edit-user/:username"
        element={<EditUser handleEditUserProfile={handleEditUserProfile}/>}
        />
      <Route
        path="/edit-owner/:username"
        element={<EditOwner handleEditOwnerProfile={handleEditOwnerProfile}/>}
        />
      <Route 
        path="/users-address/:username"
        element={<AddAddress handleUserAddress={handleUserAddress}/>}
        />
      <Route 
        path="/edit-address/:username"
        element={<EditAddress handleUserEditAddress={handleUserEditAddress}/>}
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
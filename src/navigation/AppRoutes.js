import React from "react";
import { Routes, Route } from 'react-router-dom';
import LogIn from "../forms/LogIn";
import SignUpUser from "../forms/SignUpUser";
import SignUpOwner from "../forms/SignUpOwner";
import CreateStore from "../forms/CreateStore";
import Home from "../Home";



const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/register-user" element={<SignUpUser/>}/>
            <Route path="/register-owner" element={<SignUpOwner/>}/>
            <Route path="/create-store" element={<CreateStore/>}/>
        </Routes>
    )


}

export default AppRoutes; 
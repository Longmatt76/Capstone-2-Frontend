import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./navigation/Navbar";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";
import jwt from "jsonwebtoken";
import YourStoreAPI from "./api";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./contexts/UserContext";
import { ThemeProvider } from "@emotion/react";
import { ThemeOne } from "./themes";



function App() {

  const [token, setToken] = useLocalStorage('token', 'app');
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    async function getInfo() {
      if (token) {
        const decodedToken = jwt.decode(token);
        YourStoreAPI.token = token;

        let currentUserData;
        if (decodedToken.userId) {
          currentUserData = await YourStoreAPI.getUser(
            decodedToken.userId
          );
        } else if (decodedToken.ownerId) {
          currentUserData = await YourStoreAPI.getOwner(
            decodedToken.ownerId
          );
        }
        setCurrentUser(currentUserData);
      }
    }
    getInfo();
  }, [token]);

  const handleLogOut = () => {
    setCurrentUser(null);
    setToken(null);
  };

  async function handleLogIn(data) {
    const userToken = await YourStoreAPI.loginUserOrOwner(data);
    setToken(userToken);
    return userToken;
  }

  async function handleUserSignUp(data) {
    const userToken = await YourStoreAPI.signupUser(data);
    setToken(userToken);
    return userToken;
  }

  async function handleOwnerSignup(data) {
    const ownerToken = await YourStoreAPI.signupOwner(data);
    setToken(ownerToken);
    return ownerToken;
  }

  async function handleEditUserProfile(userId, updatedData) {
    const updatedUser = await YourStoreAPI.editUser(userId, updatedData);
    setCurrentUser(updatedUser);
    return updatedUser;
  }

  async function handleEditOwnerProfile(ownerId, updatedData) {
    const updatedOwner = await YourStoreAPI.editOwner(ownerId, updatedData);
    setCurrentUser(updatedOwner);
    return updatedOwner;
  }

  return (
    <div className="App">
      <ThemeProvider theme={ThemeOne}>
        <BrowserRouter>
          <UserContext.Provider value={{ currentUser: currentUser }}>
            <Navbar logOut={handleLogOut} />
            <AppRoutes
              handleLogIn={handleLogIn}
              handleUserSignUp={handleUserSignUp}
              handleEditUserProfile={handleEditUserProfile}
              handleEditOwnerProfile={handleEditOwnerProfile}
              handleOwnerSignup={handleOwnerSignup}
            />
          </UserContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

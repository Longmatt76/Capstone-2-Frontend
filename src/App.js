import './App.css';
import React, {useState, useEffect} from 'react';
import Navbar from './navigation/Navbar';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './navigation/AppRoutes';
import jwt from 'jsonwebtoken';
import YourStoreAPI from './api';
import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './contexts/UserContext';
import { ThemeProvider } from '@emotion/react';
import { ThemeOne } from './themes';



function App() {

  const [token, setToken] = useLocalStorage('token');
  const [currentUser, setCurrentUser] = useState(null);
 
  useEffect(
    function loadUserOrOwner() {
      async function getInfo() {
        if (token) {
          let { userId, ownerId } = jwt.decode(token);
          YourStoreAPI.token = token;
          let currentUser = await YourStoreAPI.loginUserOrOwner(
            userId ? userId : ownerId
          );
          setCurrentUser(currentUser);
        }
      }
      getInfo();
    },
    [token]
  );


 const logOut = () => {
  setCurrentUser(null);
  setToken(null);
 }


  return (
    <div className="App">
      <ThemeProvider theme={ThemeOne}>
      <BrowserRouter>
      <UserContext.Provider value={{currentUser: currentUser}}>
        <Navbar logOut={logOut} />
        <AppRoutes/>
        </UserContext.Provider>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Stack, Badge, Divider } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom"
import UserContext from '../contexts/UserContext';
import '../css/Navbar.css';

const Navbar = ({ logOut }) => {
  const cartItemCount = 1;

  const { currentUser } = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton size="large" edge="" color="inherit">
            <StoreIcon />
          </IconButton>
          <NavLink to="/" className="homeTitle">
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              YOUR
              <span style={{ opacity: 0.8, fontWeight: "normal" }}>STORE</span>
            </Typography>
          </NavLink>
          <NavLink to="/register-owner">Create Store</NavLink>
        </Stack>

        {/* Center Section */}
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <SearchBar />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {!currentUser ? (
            <>
              <NavLink to="/register-user">Register</NavLink> &nbsp;
              <span style={{ opacity: 0.7 }}>|</span>
              <NavLink to="/login">Login</NavLink>{" "}
            </>
          ) : (
            <NavLink onClick={logOut} to="/">
              Logout
            </NavLink>
          )}

          <IconButton size="large" color="inherit">
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Toolbar>
      <Divider/>
      <Stack>
      </Stack>
    </AppBar>
  );
};

export default Navbar;


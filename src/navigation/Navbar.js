import React, { useContext, useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../css/Navbar.css";
import { useTheme } from "@mui/material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Badge,
  Divider,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

const Navbar = ({ logOut }) => {
  const theme = useTheme();
  const cartItemCount = 1;

  const { currentUser } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
          <IconButton size="large" color="inherit">
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
            <>
              <Stack
                direction="row"
                spacing={1}
                alignItems="flex-end"
                onClick={handleMenuOpen}
                sx={{
                  cursor: "pointer",
                }}
              >
                Profile
              </Stack>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ marginTop: 2.5 }}
                disableAutoFocusItem
              >
                <MenuItem onClick={handleMenuClose}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Username
                  </Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Typography variant="body2">
                    {currentUser.username}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Email
                  </Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Typography variant="body2">{currentUser.email}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    First Name
                  </Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Typography variant="body2">
                    {currentUser.firstName}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Last Name
                  </Typography>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Typography variant="body2">
                    {currentUser.lastName}
                  </Typography>
                </MenuItem>
                <Divider />
                {!currentUser.roles ? (
                  <MenuItem onClick={handleMenuClose}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      Address
                    </Typography>
                    &nbsp;
                    <Typography variant="body2">
                      {currentUser.addresses[0] ? (
                        currentUser.addresses.map((property, index) => (
                          <MenuItem key={index} onClick={handleMenuClose}>
                            <Typography variant="body2">
                              {property.streetAddress}
                              <br />
                              {property.city}&nbsp;{property.state}
                              <br />
                              {property.zipCode}
                            </Typography>
                          </MenuItem>
                        ))
                      ) : (
                        <>
                          <NavLink
                            style={{ opacity: 1 }}
                            to={`/users-address/:${currentUser.username}`}
              
                          >
                            &nbsp; &nbsp; &nbsp;<Button
                              sx={{ opacity: 1 }}
                              size="small"
                              variant="outlined"
                              color="error"
                              id="addButt"
                            >
                              Add
                            </Button>
                          </NavLink>
                        </>
                      )}
                    </Typography>
                  </MenuItem>
                ) : null}

                <Divider />
                <MenuItem sx={{ justifyContent: "center" }}>
                  <NavLink
                    style={{ opacity: 1 }}
                    to={
                     currentUser.roles === "owner"
                        ? `/edit-owner/:${currentUser.username}`
                        : `/edit-user/:${currentUser.username}`
                    }
                  >
                    <Button
                      onClick={handleMenuClose}
                      variant="outlined"
                      fullWidth
                      color="error"
                      size="small"
                      sx={{ opacity: 1 }}
                    >
                      Edit Profile
                    </Button>
                  </NavLink>
                  {!currentUser.roles ? (
                    <NavLink
                      style={{ opacity: 1 }}
                      to={`/edit-address/:${currentUser.username}`}
                    >
                      <Button
                        onClick={handleMenuClose}
                        variant="outlined"
                        fullWidth
                        color="error"
                        size="small"
                        sx={{ opacity: 1 }}
                      >
                        Edit Address
                      </Button>
                    </NavLink>
                  ) : null}
                </MenuItem>
              </Menu>
              <NavLink onClick={logOut} to="/">
                Logout
              </NavLink>
            </>
          )}

          <IconButton size="large" color="inherit">
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Toolbar>
      <Divider />
      <Stack></Stack>
    </AppBar>
  );
};

export default Navbar;

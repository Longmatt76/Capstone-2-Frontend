import React, { useContext, useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AssignmentIcon from "@mui/icons-material/Assignment";
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
  Drawer,
  Avatar,
} from "@mui/material";

const Navbar = ({ logOut }) => {
  const theme = useTheme();
  const cartItemCount = 1;

  const { currentUser, currentStore } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {!currentStore ? (
            <IconButton size="large" color="inherit">
              <StoreIcon />
            </IconButton>
          ) : (
            <Avatar src={`${currentStore.logo}`} />
          )}

          {!currentStore ? (
            <NavLink to="/" className="homeTitle">
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                YOUR
                <span style={{ opacity: 0.8, fontWeight: "normal" }}>
                  STORE
                </span>
              </Typography>
            </NavLink>
          ) : (
            <NavLink to="/" className="homeTitle">
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {currentStore.storeName}
              </Typography>
            </NavLink>
          )}

          {!currentUser ? (
            <NavLink to="/register-owner"><Typography>Create Store</Typography></NavLink>
          ) : (
            <>
              {currentUser.roles === "owner" ? (
                <>
                  <NavLink onClick={() => setIsDrawerOpen(true)}>
                    <Typography>Manage Store</Typography>
                  </NavLink>
                  <Drawer
                    anchor="left"
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                   
                  >
                    {" "}
                    <Stack
                      direction={"column"}
                      p={4}
                      spacing={4}
                      textAlign="center"
                    >
                      <Typography variant="h6"></Typography>
                      <Divider />
                      <Stack alignItems="center" direction="row">
                        {" "}
                        <MenuItem>
                          <StoreIcon />
                          &nbsp;&nbsp;
                          <NavLink
                            to={
                              !currentStore
                                ? `/stores/add-details/${currentUser.ownerId}`
                                : `/stores/edit-details/${currentUser.ownerId}`
                            }
      
                            onClick={() => setIsDrawerOpen(false)}
                          >
                            <Typography color={theme.palette.text.primary} variant="h6">Store Details</Typography>
                          </NavLink>{" "}
                        </MenuItem>
                      </Stack>
                      <Divider />
                      <Stack alignItems="center" direction="row">
                        {" "}
                        <MenuItem>
                          <InventoryIcon /> &nbsp;&nbsp;
                          <NavLink
                            to="/stores/products"
                            color={theme.palette.text.primary}
                          >
                            <Typography color={theme.palette.text.primary}  variant="h6">Products</Typography>
                          </NavLink>
                        </MenuItem>
                      </Stack>
                      <Divider />
                      <Stack alignItems="center" direction="row">
                        <MenuItem>
                          <CategoryIcon /> &nbsp;&nbsp;
                          <NavLink
                            to="/stores/categories"
                            
                          >
                            <Typography color={theme.palette.text.primary}  variant="h6">Categories</Typography>
                          </NavLink>
                        </MenuItem>
                      </Stack>
                      <Divider />
                      <Stack alignItems="center" direction="row">
                        <MenuItem>
                          <LocalOfferIcon /> &nbsp;&nbsp;
                          <NavLink
                            to="/stores/promotions"
                           
                          >
                            <Typography color={theme.palette.text.primary} variant="h6">Promotions</Typography>
                          </NavLink>
                        </MenuItem>
                      </Stack>
                      <Divider />
                      <Stack alignItems="center" direction="row">
                        <MenuItem>
                          <AssignmentIcon /> &nbsp;&nbsp;
                          <NavLink
                            to="/stores/orders"
                           
                          >
                            <Typography color={theme.palette.text.primary} variant="h6">Orders</Typography>
                          </NavLink>
                        </MenuItem>
                      </Stack>
                      <Divider />
                    </Stack>
                  </Drawer>
                </>
              ) : (
                <Stack>
                  <Typography width={60}></Typography>
                </Stack>
              )}
            </>
          )}
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
              <NavLink to="/register-user"><Typography>Register</Typography></NavLink> 
              <span style={{ opacity: 0.7 }}><Typography>|</Typography></span>
              <NavLink to="/login"><Typography>Login</Typography></NavLink>{" "}
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
               <Typography> Profile</Typography>
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
                            &nbsp; &nbsp; &nbsp;
                            <Button
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
                  {!currentUser.roles && currentUser.addresses[0] ? (
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
               <Typography>Logout</Typography> 
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

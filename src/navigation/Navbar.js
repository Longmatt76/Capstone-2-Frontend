import React, { useContext, useEffect, useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCart from "../shoppingCart/ShoppingCart";
import { CartContex } from "../contexts/CartContext";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../static/css/Navbar.css";
import { useTheme } from "@mui/material/styles";
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
  Modal
} from "@mui/material";

const Navbar = ({ logOut }) => {
  const theme = useTheme();
  const { cartItems } = useContext(CartContex);

  const { currentUser, currentStore } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  console.log("cartItems", cartItems);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: theme.zIndex.drawer + 1, borderBottom: "1px solid grey" }}
    >
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
                sx={{ fontWeight: "bold", textShadow: "1.5px 1.5px 1px black" }}
              >
                {currentStore.storeName}
              </Typography>
            </NavLink>
          )}

          {!currentUser ? (
            <NavLink to="/register-owner">
              <Typography>Create Store</Typography>
            </NavLink>
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
                      pb={100}
                      spacing={4}
                      textAlign="center"
                      sx={{ backgroundColor: theme.palette.secondary.main }}
                    >
                      <Typography variant="h6"></Typography>
                      <Divider />
                      <Stack alignItems="center" direction="row">
                        {" "}
                        <MenuItem>
                          &nbsp;&nbsp;
                          <NavLink
                            to={
                              !currentStore
                                ? `/stores/add-details/${currentUser.ownerId}`
                                : `/stores/edit-details/${currentUser.ownerId}`
                            }
                            onClick={() => setIsDrawerOpen(false)}
                          >
                            <Stack direction="row" ml={-1} alignItems="center">
                              <StoreIcon
                                sx={{
                                  color: theme.palette.primary.contrastText,
                                  marginTop: 2.5,
                                }}
                              />{" "}
                              &nbsp;&nbsp;{" "}
                              <Typography
                                color={theme.palette.text.contrastText}
                                mt={3}
                                variant="h6"
                              >
                                Store Details
                              </Typography>
                            </Stack>
                          </NavLink>{" "}
                        </MenuItem>
                      </Stack>
                      <Divider
                        sx={{
                          backgroundColor: theme.palette.primary.contrastText,
                        }}
                      />
                      {currentStore && (
                        <>
                          {" "}
                          <Stack alignItems="center" direction="row">
                            <MenuItem>
                              <InventoryIcon
                                sx={{
                                  color: theme.palette.primary.contrastText,
                                }}
                              />{" "}
                              &nbsp;&nbsp;
                              <NavLink
                                to="/stores/products"
                                color={theme.palette.text.primary}
                                onClick={() => setIsDrawerOpen(false)}
                              >
                                <Typography
                                  color={theme.palette.text.contrastText}
                                  variant="h6"
                                >
                                  Products
                                </Typography>
                              </NavLink>
                            </MenuItem>
                          </Stack>
                          <Divider
                            sx={{
                              backgroundColor:
                                theme.palette.primary.contrastText,
                            }}
                          />
                          <Stack alignItems="center" direction="row">
                            <MenuItem>
                              <CategoryIcon
                                sx={{
                                  color: theme.palette.primary.contrastText,
                                }}
                              />{" "}
                              &nbsp;&nbsp;
                              <NavLink
                                to="/stores/categories"
                                onClick={() => setIsDrawerOpen(false)}
                              >
                                <Typography
                                  color={theme.palette.text.contrastText}
                                  variant="h6"
                                >
                                  Categories
                                </Typography>
                              </NavLink>
                            </MenuItem>
                          </Stack>
                          <Divider
                            sx={{
                              backgroundColor:
                                theme.palette.primary.contrastText,
                            }}
                          />
                          <Stack alignItems="center" direction="row">
                            <MenuItem>
                              <LocalOfferIcon
                                sx={{
                                  color: theme.palette.primary.contrastText,
                                }}
                              />{" "}
                              &nbsp;&nbsp;
                              <NavLink to="/stores/promotions">
                                <Typography
                                  color={theme.palette.text.contrastText}
                                  variant="h6"
                                >
                                  Promotions
                                </Typography>
                              </NavLink>
                            </MenuItem>
                          </Stack>
                          <Divider
                            sx={{
                              backgroundColor:
                                theme.palette.primary.contrastText,
                            }}
                          />
                          <Stack alignItems="center" direction="row">
                            <MenuItem>
                              <AssignmentIcon
                                sx={{
                                  color: theme.palette.primary.contrastText,
                                }}
                              />{" "}
                              &nbsp;&nbsp;
                              <NavLink to="/stores/orders">
                                <Typography
                                  color={theme.palette.text.contrastText}
                                  variant="h6"
                                >
                                  Orders
                                </Typography>
                              </NavLink>
                            </MenuItem>
                          </Stack>
                          <Divider
                            sx={{
                              backgroundColor:
                                theme.palette.primary.contrastText,
                            }}
                          />
                        </>
                      )}
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
          direction="column"
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
              <NavLink to="/register-user">
                <Typography>Register</Typography>
              </NavLink>
              <span style={{ opacity: 0.7 }}>
                <Typography>|</Typography>
              </span>
              <NavLink to="/login">
                <Typography>Login</Typography>
              </NavLink>{" "}
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

          <IconButton size="large" color="inherit" onClick={handleOpenModal}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Modal 
          open={openModal}
          onClose={handleCloseModal}>
           <ShoppingCart/>
          </Modal>
        </Stack>
      </Toolbar>
      <Divider />
      <Stack></Stack>
    </AppBar>
  );
};

export default Navbar;

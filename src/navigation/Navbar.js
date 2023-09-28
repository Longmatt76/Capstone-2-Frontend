import React, { useContext, useState, forwardRef } from "react";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { CartContex } from "../contexts/CartContext";
import { CarouselContext } from "../contexts/CarouselContext";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../static/css/Navbar.css";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import RemoveIcon from "@mui/icons-material/Remove";
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
  Modal,
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Box,
  Tooltip,
} from "@mui/material";

const ShoppingCartModal = forwardRef(({ handleCheckout }, ref) => {
  const checkoutTooltip = (
    <Typography p={1} variant="subtitle2">
      Clicking "Checkout" will redirect you to a Stripe test checkout page. Fill
      out your payment form with test data. Enter any email. Enter 4242 4242 4242 4242 as the
      card number. Enter any future date for card expiry. Enter any 3-digit
      number for CVV. Enter any billing postal code
    </Typography>
  );
  const theme = useTheme();
  const { currentUser, currentStore } = useContext(UserContext);
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    deleteFromCart,
    clearCart,
    setShowCart,
    toggleCartItemQty,
  } = useContext(CartContex);
  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: 20 }}>
        <Paper sx={{ padding: 2 }} elevation={10}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              padding: 1,
              borderRadius: 3,
            }}
          >
            <ShoppingCartIcon />{" "}
            <Typography variant="h5" textAlign="center">
              Shopping Cart
            </Typography>
          </Stack>
          <Divider sx={{ marginTop: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">#</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="center">Product</TableCell>
                  <TableCell align="center">Unit Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, idx) => (
                  <TableRow
                    key={item.productId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="right">
                      <img
                        alt={item.productName}
                        src={`${item.image}`}
                        height="40"
                      ></img>
                    </TableCell>
                    <TableCell align="center">{item.productName}</TableCell>
                    <TableCell align="center">${item.price}</TableCell>
                    <TableCell align="right">
                      {" "}
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconButton
                          sx={{
                            border: "1px solid black",
                            borderRadius: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                          }}
                          color="inherit"
                          onClick={() =>
                            toggleCartItemQty(item.productId, "sub")
                          }
                          size="small"
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Box
                          px={2}
                          sx={{
                            border: "1px solid black",
                            color: theme.palette.primary.main,
                            fontWeight: "bold",
                          }}
                        >
                          {item.quantity > 0 ? item.quantity : 0}
                        </Box>
                        <IconButton
                          sx={{
                            border: "1px solid black",
                            borderRadius: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                          }}
                          color="inherit"
                          onClick={() =>
                            toggleCartItemQty(item.productId, "add")
                          }
                          size="small"
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      {(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => deleteFromCart(item)}>
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Divider />
            <Box mt={2}>
              <Paper>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  p={1}
                >
                  <Button
                    variant="default"
                    onClick={() => {
                      clearCart();
                      setShowCart(false);
                    }}
                    startIcon={<DeleteIcon />}
                    size="large"
                    sx={{ marginTop: 4 }}
                  >
                    Clear Cart
                  </Button>
                  <Stack>
                    <Typography variant="h6" fontWeight="bold">
                      Total ({totalQuantities} items):{" "}
                      <span style={{ color: theme.palette.primary.main }}>
                        {totalPrice.toFixed(2)}
                      </span>{" "}
                    </Typography>
                    <Tooltip title={checkoutTooltip} arrow>
                    <Button
                      onClick={() =>
                        handleCheckout(
                          currentStore.ownerId,
                          currentUser?.userId ? currentUser.userId : undefined,
                          { cartItems }
                        )
                      }
                      variant="contained"
                      startIcon={<PointOfSaleIcon />}
                    >
                      Checkout
                    </Button>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
});

const Navbar = ({ logOut, handleCheckout }) => {
  const theme = useTheme();
  const { cartItems, showCart, setShowCart, clearCart } =
    useContext(CartContex);

  const { currentUser, currentStore } = useContext(UserContext);

  const { carousel } = useContext(CarouselContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
            <NavLink to={"/"} className="homeTitle">
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
            <NavLink to={`/${currentStore?.storeId}`} className="homeTitle">
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
                                color={theme.palette.primary.contrastText}
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
                                  color={theme.palette.primary.contrastText}
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
                                  color={theme.palette.primary.contrastText}
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
                              <ViewCarouselIcon
                                sx={{
                                  color: theme.palette.primary.contrastText,
                                }}
                              />{" "}
                              &nbsp;&nbsp;
                              <NavLink
                                onClick={() => setIsDrawerOpen(false)}
                                to={
                                  carousel !== undefined
                                    ? `/stores/:ownerId/carousel-edit/:storeId`
                                    : `/stores/:ownerId/carousel-add/:storeId`
                                }
                              >
                                <Typography
                                  color={theme.palette.primary.contrastText}
                                  variant="h6"
                                >
                                  Carousel
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
                              <NavLink
                                onClick={() => setIsDrawerOpen(false)}
                                to={`/stores/${currentStore?.ownerId}/orders/${currentStore?.storeId}`}
                              >
                                <Typography
                                  color={theme.palette.primary.contrastText}
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
                          <Stack alignItems="center" direction="row">
                            <MenuItem>
                              <AssessmentIcon
                                sx={{
                                  color: theme.palette.primary.contrastText,
                                }}
                              />{" "}
                              &nbsp;&nbsp;
                              <NavLink
                                onClick={() => setIsDrawerOpen(false)}
                                to={`/stores/${currentStore?.ownerId}/inventory/${currentStore?.storeId}`}
                              >
                                <Typography
                                  color={theme.palette.primary.contrastText}
                                  variant="h6"
                                >
                                  Inventory
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
              <NavLink
                onClick={() => {
                  logOut();
                  clearCart();
                }}
                to="/"
              >
                <Typography>Logout</Typography>
              </NavLink>
            </>
          )}

          <IconButton
            size="large"
            color="inherit"
            onClick={() => setShowCart(true)}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {cartItems.length > 0 && showCart && (
            <Modal open={showCart} onClose={() => setShowCart(false)}>
              <ShoppingCartModal handleCheckout={handleCheckout} ref={null} />
            </Modal>
          )}
        </Stack>
      </Toolbar>
      <Divider />
      <Stack></Stack>
    </AppBar>
  );
};

export default Navbar;

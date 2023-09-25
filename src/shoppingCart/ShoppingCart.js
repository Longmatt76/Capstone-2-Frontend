import {
  Container,
  Stack,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContex } from "../contexts/CartContext";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

const ShoppingCart = ({ handleCheckout }) => {
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
                <TableCell align="left">#</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Unit Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableHead>
              <TableBody>
                {cartItems.map((item, idx) => (
                  <TableRow
                    key={item.productName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="right">
                      <img alt={item.productName} src={`${item.image}`} height="40"></img>
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
                    <Button
                      onClick={() =>
                        handleCheckout(
                          currentStore.ownerId,
                          currentUser.userId
                            ? currentUser.userId
                            : currentUser.ownerId,
                          {cartItems}
                        )
                      }
                      variant="contained"
                      startIcon={<PointOfSaleIcon />}
                    >
                      Checkout
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default ShoppingCart;

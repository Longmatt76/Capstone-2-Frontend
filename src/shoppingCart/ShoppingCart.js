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
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

const ShoppingCart = () => {
  const theme = useTheme();
  const { qty, addQty, subQty, onAdd, cartItems } = useContext(CartContex);
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
                      <img src={`${item.image}`} height="40"></img>
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
                          onClick={subQty}
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
                          {qty}
                        </Box>
                        <IconButton
                          sx={{
                            border: "1px solid black",
                            borderRadius: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                          }}
                          color="inherit"
                          onClick={addQty}
                          size="small"
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">$1444</TableCell>
                    <TableCell align="center">delete</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Divider />
            <Box mt={2}>
              <Paper>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Button variant="outlined" startIcon={<DeleteIcon />} size="large" sx={{marginTop: 4}}>
                    Clear Cart
                  </Button>
                  <Stack>
                    <Typography variant="h6" fontWeight='bold'>Total ({cartItems.length} items): <span style={{color: theme.palette.primary.main}}>$89.43</span> </Typography>
                  <Button variant="contained" startIcon={<PointOfSaleIcon/>}>
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
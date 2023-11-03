import React, { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import YourStoreAPI from "../api";

import {
  Typography,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const StoreOrders = () => {
  const { currentStore } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  async function getOrders(ownerId, storeId) {
    const orders = await YourStoreAPI.getOrders(ownerId, storeId);
    setOrders(orders);
  }

  useEffect(() => {
    if (currentStore) {
      getOrders(currentStore?.ownerId, currentStore?.storeId);
    }
  }, [currentStore]);

  return (
    <>
      {orders.length > 0 ? (
        <Container maxWidth="lg" sx={{ marginTop: 20 }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Order id</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Order Datetime</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Customer</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Order Total</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Status</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>
                      <Typography variant="subtitle1">{o.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{o.order_date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{o.username}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        $&nbsp;{o.order_total / 100}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{o.order_status}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      ) : (
        <Container maxWidth="sm" sx={{marginTop: 25}}>
          <Stack spacing={1}>
            <Typography textAlign='center' variant="h5">You currently have no orders</Typography>
            <Typography textAlign='center' variant="subtitle2">
              Orders will appear here when recieved
            </Typography>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default StoreOrders;

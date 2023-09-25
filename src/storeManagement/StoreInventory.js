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

const StoreInventory = () => {
    const { currentStore } = useContext(UserContext);
    const [storeProducts, setStoreProducts] = useState([]);
  
    async function searchProducts(ownerId, storeId) {
      let storeProducts = await YourStoreAPI.getProducts(ownerId, storeId);
      setStoreProducts(storeProducts);
    }
  
    useEffect(() => {
      if (currentStore) {
        searchProducts(currentStore.ownerId, currentStore.storeId);
      }
    }, [currentStore]);

  return (
    <>
      {storeProducts.length > 0 ? (
        <Container maxWidth="lg" sx={{ marginTop: 20 }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Product Id</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Category</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Product Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Quantity In Stock</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storeProducts.map((p) => (
                  <TableRow key={p.productId}>
                    <TableCell>
                      <Typography variant="subtitle1">{p.productId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{p.categoryName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{p.productName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{p.qty}</Typography>
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
            <Typography textAlign='center' variant="h5">You currently have no products</Typography>
            <Typography textAlign='center' variant="subtitle2">
              Product inventories will appear here for each product listed
            </Typography>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default StoreInventory;
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Grid, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Loading from "../helpers/Loading";
import ProductCard from "./ProductCard";
import { v4 as uuid} from 'uuid';
import {
  Typography,
  Card,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  CardMedia,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import YourStoreAPI from "../api";

const ProductList = () => {
  const { currentStore } = useContext(UserContext);
  const [storeProducts, setStoreProducts] = useState([]);

  async function searchProducts(ownerId, storeId) {
    let storeProducts = await YourStoreAPI.getProducts(ownerId, storeId);
    setStoreProducts(storeProducts);
  }

  useEffect(() => {
    if (currentStore?.products.length) {
      searchProducts(currentStore.ownerId, currentStore.storeId);
    }
  }, [currentStore]);

  if (!storeProducts) return <Loading />;

  return (
    <>
      <Container maxWidth="lg" sx={{marginTop: 3, marginBottom:5}}>
        <Grid container spacing={3}>
          {storeProducts.map((p) => (
            <Grid item xs={3}>
              <ProductCard
                key={uuid()}
                storeId={p.storeId}
                productId={p.productId}
                brand={p.brand}
                title={p.productName}
                description={p.productDescription}
                image={p.image}
                price={p.price}
                qty={p.qty}
                category={p.categoryName}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ProductList;

import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Grid, Typography } from "@mui/material"; // Import Typography for displaying "No products found" message
import ProductCard from "./ProductCard";
import { v4 as uuid } from "uuid";
import { Container } from "@mui/material";
import YourStoreAPI from "../api";
import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "@mui/material/styles";

const ProductList = () => {
  const { currentStore, productSearch } = useContext(UserContext);
  const [storeProducts, setStoreProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const theme = useTheme();

  async function searchProducts(ownerId, storeId, productSearch) {
    let storeProducts = await YourStoreAPI.getProducts(
      ownerId,
      storeId,
      productSearch || null
    );
    setStoreProducts(storeProducts);
    setLoading(false); 
  }

  useEffect(() => {
    if (currentStore) {
      searchProducts(currentStore.ownerId, currentStore.storeId, productSearch);
    }
  }, [currentStore, productSearch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false); 
      }
    }, 5000);

    return () => {
      clearTimeout(timeoutId); 
    };
  }, [loading]);

  if (loading) {
    return (
      <Container>
        <Grid container justifyContent="center">
          <ThreeDots
            color={theme.palette.primary.main}
            width={125}
            height={125}
          />
        </Grid>
      </Container>
    );
  }

  if (storeProducts.length === 0 && currentStore?.products[0]) {
    return (
      <Container>
        <Typography sx={{marginTop: 3}} textAlign='center' variant="h6">No products found</Typography>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 3, marginBottom: 5 }}>
        <Grid container spacing={3}>
          {storeProducts.map((p) => (
            <Grid item key={uuid()} xs={3}>
              <ProductCard
                key={p.productName}
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

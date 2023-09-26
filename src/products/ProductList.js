import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { v4 as uuid } from "uuid";
import { Container } from "@mui/material";
import YourStoreAPI from "../api";
import { ThreeDots} from "react-loader-spinner";
import { useTheme } from "@mui/material/styles";

const ProductList = () => {
  const { currentStore, productSearch } = useContext(UserContext);
  const [storeProducts, setStoreProducts] = useState([]);
  const theme = useTheme();

  async function searchProducts(ownerId, storeId, productSearch) {
    let storeProducts = await YourStoreAPI.getProducts(
      ownerId,
      storeId,
      productSearch || null
    );
    setStoreProducts(storeProducts);
  }

  useEffect(() => {
    if (currentStore) {
      searchProducts(currentStore.ownerId, currentStore.storeId, productSearch);
    }
  }, [currentStore, productSearch]);

  if (storeProducts.length === 0 && currentStore.products[0])
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

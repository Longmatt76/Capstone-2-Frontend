import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { v4 as uuid } from "uuid";
import { Container, Paper, alpha, Typography } from "@mui/material";
import YourStoreAPI from "../api";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const theme = useTheme();
  const { categoryId } = useParams();
  const { currentStore} = useContext(UserContext);

  const [category, setCategory] = useState([]);

  async function mountCategory(ownerId, categoryId) {
    let category = await YourStoreAPI.getCategory(ownerId, categoryId);
    setCategory(category);
  }

  useEffect(() => {
    if(currentStore)
    mountCategory(currentStore.ownerId, categoryId);
  }, [currentStore, categoryId]);


  return (
    <>
      <Container sx={{ marginTop: 20 }} maxWidth="lg">
        <Paper sx={{ padding: 0 }}>
          <Grid container>
            <Grid
              item
              xs={0.25}
              sx={{ backgroundColor: theme.palette.primary.main }}
            ></Grid>
            <Grid item xs={11}>
              <Typography
                textAlign="left"
                my={1}
                ml={5}
                variant="h5"
                color={alpha(theme.palette.text.secondary, 0.4)}
              >
                Browse Our {category.categoryName}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Container maxWidth="lg" sx={{ marginTop: 3, marginBottom: 5 }}>
        <Grid container spacing={3}>
          {category && category.products && category.products.map((p) => (
            <Grid item key={uuid()} xs={3}>
              <ProductCard
                key={p.productName}
                productId={p.id}
                brand={p.brand}
                title={p.name}
                description={p.productDescription}
                image={p.image}
                price={p.price}
                qty={p.qty}
                category={category.categoryName}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CategoryProducts;

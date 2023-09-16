import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { CartContex } from "../contexts/CartContext";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import YourStoreAPI from "../api";
import Loading from "../helpers/Loading";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Footer from "../navigation/Footer";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Container,
  Grid,
  Divider,
  Paper,
  IconButton,
  CardMedia,
  Stack,
} from "@mui/material";

const ProductDetails = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { productId } = useParams();
  const { currentStore } = useContext(UserContext);
  const { qty, setQty, addQty, subQty, onAdd } = useContext(CartContex);

  const [product, setProduct] = useState([]);

  async function mountProduct(ownerId, productId) {
    let product = await YourStoreAPI.getProduct(ownerId, productId);
    setProduct(product);
  }

  useEffect(() => {
    if (currentStore) mountProduct(currentStore.ownerId, productId);
  }, [currentStore, productId]);

  if (!product) return <Loading />;
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 25 }}>
        <Paper elevation={20}>
          <Grid container justifyContent="center">
            <Grid item xs={5} mx={3}>
              <CardMedia
                component="img"
                image={`${product.image}`}
                height={400}
              />
            </Grid>
            <Grid item xs={5} mx={3}>
              <Typography
                textAlign="center"
                sx={{
                  marginTop: 2,
                  color: theme.palette.primary.main,
                  textShadow: "1px 1px 1px black",
                }}
                variant="h4"
              >
                {product.productName}
              </Typography>
              <Divider
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                }}
              />
              <Typography
                variant="body2"
                textAlign="center"
                color={theme.palette.text.secondary}
              >
                {product.productDescription}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                mt={2}
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.primary.main }}
                >
                  Brand:
                </Typography>

                <Typography variant="subtitle1">
                  {product.brand ? product.brand : "Unknown"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.primary.main }}
                >
                  &nbsp;&nbsp;Category:
                </Typography>

                <Typography variant="subtitle1">
                  {product.categoryName}
                </Typography>
              </Stack>
              <Paper
                elevation={5}
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  marginTop: 2,
                  padding: 1,
                }}
                height="20"
              >
                <Typography
                  variant="h6"
                  textAlign="center"
                  color={theme.palette.primary.main}
                >
                  ${product.price}
                </Typography>
                <Typography
                  textAlign="center"
                  fontSize="small"
                  variant="body2"
                  fontStyle="italic"
                >
                  only&nbsp;{product.qty}&nbsp;left!
                </Typography>
              </Paper>
              <Stack
                direction="row"
                alignItems="center"
                mt={2}
                mr={7}
                justifyContent="center"
              >
                <Typography mr={1} variant="body1">
                  Quantity:
                </Typography>
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
                  <RemoveIcon />
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
                  <AddIcon />
                </IconButton>
              </Stack>
              <Stack mt={4} direction="row" spacing={3} justifyContent="center">
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCartIcon />}
                  onClick={async function () {
                    await onAdd(product, qty);
                    setQty(0);
                    navigate('/');
                  }}
                >
                  Add to Cart
                </Button>
                <Button variant="contained" startIcon={<PointOfSaleIcon />}>
                  Buy Now
                </Button>
              </Stack>
              <Divider sx={{ marginTop: 3 }} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;

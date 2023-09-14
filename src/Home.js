import { Container, Paper, Typography, Grid, alpha, } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Carousel from "./Carousel";
import ProductList from "./products/ProductList";

const Home = () => {
  const theme = useTheme();
  return (
    <>
      <Carousel />
      <Container sx={{ marginTop: 5 }} maxWidth="lg">
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
                Browse Our Products
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <ProductList />
    
    </>
  );
};

export default Home;

import React, { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import "../static/css/AddProducts.css";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Container,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  alpha,
  InputAdornment,
  Paper,
} from "@mui/material";

const EditProduct = ({ handleEditProduct, handleDeleteProduct }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentStore } = useContext(UserContext);

  const INITIALSTATE = {
    productName: "",
    brand: "",
    productDescription: "",
    image: "",
    price: "",
    qty: "",
  };

  const [formData, setFormData] = useState(INITIALSTATE);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "id") {
       const  selectedProduct = currentStore.products.find(
        (p) => p.id === value
      );

      setSelectedProduct(selectedProduct);
      setFormData((fdata) => ({
        ...fdata,
        productName: selectedProduct.name,
        brand: selectedProduct.brand,
        productDescription: selectedProduct.description,
        image: selectedProduct.image,
        price: selectedProduct.price,
        qty: selectedProduct.qty,
      }));
    } else {
      setFormData((fdata) => ({
        ...fdata,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleEditProduct(currentStore.ownerId, selectedProduct.id, formData);
    setFormData(INITIALSTATE);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="md">
          <Paper>
            <Grid
              container
              mt={20}
              justifyContent="center"
              p={1}
              sx={{
                backgroundColor: theme.palette.secondary.light,
                border: `1px solid black`,
              }}
            >
              <Grid item xs={10} m={1}>
                <Typography variant="h5" mt={2} mb={1}>
                  Select Product
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="catSelect">select product to edit</InputLabel>
                  <Select
                    labelId="productSelect"
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        0.5
                      ),
                      marginBottom: 1,
                    }}
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    label="select existing category"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                  >
                    {currentStore.products.map((p) => (
                      <MenuItem value={p.id}>{p.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Divider sx={{ marginTop: 1 }} />
              </Grid>

              <Grid item xs={5} my={2} mx={1}>
                <Typography variant="h5" mb={1}>
                  Product Details
                </Typography>
                <TextField
                  sx={{
                    backgroundColor: alpha(
                      theme.palette.primary.contrastText,
                      0.5
                    ),
                    marginBottom: 1,
                  }}
                  label="product name"
                  placeholder="enter product name"
                  fullWidth
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                />
                <TextField
                  sx={{
                    backgroundColor: alpha(
                      theme.palette.primary.contrastText,
                      0.5
                    ),
                    marginBottom: 1,
                  }}
                  label="brand"
                  placeholder="enter product brand if applicable"
                  fullWidth
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
                <TextField
                  sx={{
                    backgroundColor: alpha(
                      theme.palette.primary.contrastText,
                      0.5
                    ),
                    marginBottom: 1,
                  }}
                  multiline
                  maxRows={4}
                  label="product description"
                  placeholder="enter a product description"
                  fullWidth
                  type="text"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                />
             
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h5" mt={2} mb={1}>
                  Media
                </Typography>
           
                <TextField
                  sx={{
                    backgroundColor: alpha(
                      theme.palette.primary.contrastText,
                      0.6,
                    ),
                  }}
                  label="image URL"
                  placeholder="enter an image URL"
                  fullWidth
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
                <Typography variant="h5" mt={2.7} mb={1}>
                  Pricing and Inventory
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  label="price"
                  name="price"
                  fullWidth
                  value={formData.price}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="0.00"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: alpha(
                      theme.palette.primary.contrastText,
                      0.6
                    ),
                    marginTop: 1,
                  }}
                  variant="outlined"
                />
                <TextField
                  id="input-with-icon-textfield"
                  label="quantity"
                  name="qty"
                  fullWidth
                  value={formData.qty}
                  onChange={handleChange}
                  placeholder="enter quantity in stock"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                  autoComplete="off"
                  variant="outlined"
                  sx={{
                    backgroundColor: alpha(
                      theme.palette.primary.contrastText,
                      0.6
                    ),
                    marginTop: 1,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <Divider sx={{ margin: 2 }} />
                <Button
                  color="secondary"
                  fullWidth
                  variant="contained"
                  sx={{ marginBottom: 1}}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    marginTop: 1,
                    marginBottom:2,
                    backgroundColor: alpha(
                      theme.palette.primary.contrastText,
                      0.5
                    ),
                  }}
                  onClick={() => {
                    handleDeleteProduct(currentStore.ownerId, selectedProduct.id);
                    navigate('/');
                  }}
                >
                  Delete Selected Product
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </form>
    </>
  );
};

export default EditProduct;

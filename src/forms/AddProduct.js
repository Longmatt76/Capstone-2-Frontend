import React, { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate} from "react-router-dom";
import UserContext from "../contexts/UserContext";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import '../static/css/AddProducts.css'
import {
  Typography,
  Grid,
  Card,
  CardContent,
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
  Stack,
  Link
} from "@mui/material";

const AddProduct = ({ handleAddProduct }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentStore } = useContext(UserContext);

  const INITIALSTATE = {
    productName: "",
    brand: "",
    productDescription: "",
    categoryName: "",
    image: "",
    price: "",
    qty: "",
  };

  const [formData, setFormData] = useState(INITIALSTATE);
  const [categorySelected, setCategorySelected] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName") {
      setCategorySelected(value !== "");
    }

    setFormData((fdata) => ({
      ...fdata,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
  
      setFormData((fdata) => ({
        ...fdata,
        image: imageUrl,
      }));
    } else {
      setFormData((fdata) => ({
        ...fdata,
        image: '', 
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCategoryName = categorySelected
      ? formData.categoryName
      : formData.createCategoryName;
    await handleAddProduct(currentStore.ownerId, currentStore.storeId, {
      ...formData,
      categoryName: selectedCategoryName,
    });
    setFormData(INITIALSTATE);
    navigate("/");
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            backgroundColor: theme.palette.secondary.light,
            marginTop: 20,
            border: `1px solid black`,
          }}
        >
          <CardContent>
           
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              mt={1}
            >
              <Grid xs={12} sm={12} item>
                <form onSubmit={handleSubmit}>
                  <Stack direction='row'>
                <Link alignItems="center" onClick={() => navigate('/')}>
                <ArrowBackIcon fontSize="large" sx={{ color: theme.palette.text, marginTop: 0}} />
              </Link>  <Typography variant="h6" mb={1}>Product Details</Typography>
              </Stack>
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
                          {currentStore?.categories[0] ? (
                    <FormControl fullWidth>
                      <InputLabel id="catSelect">
                        select existing category
                      </InputLabel>
                      <Select
                        labelId="catSelect"
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
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleChange}
                      >
                        {currentStore.categories.map((c) => (
                          <MenuItem value={c.name}>{c.name}</MenuItem>
                        ))}
                        <MenuItem
                          value=""
                          sx={{ color: theme.palette.error.main }}
                        >
                          Clear selection
                        </MenuItem>
                      </Select>
                    </FormControl>
                  ) : null}
                  {formData.categoryName === "" && (
                    <TextField
                      sx={{
                        backgroundColor: alpha(
                          theme.palette.primary.contrastText,
                          0.5
                        ),
                        marginBottom: 1,
                      }}
                      fullWidth
                      label="create new category"
                      placeholder="enter category name"
                      type="text"
                      name="createCategoryName"
                      value={formData.createCategoryName}
                      onChange={handleChange}
                    />
                  )}
                    <Divider sx={{marginBottom: 2}}/>
                    <Typography variant="h6">Media</Typography>
                    <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                size="small"
                fullWidth
                className="custom-file-input"
                style={{marginBottom: 0}}
            
              />
                    <TextField
                sx={{
                  backgroundColor: alpha(theme.palette.primary.contrastText, 0.5),
                }}
                label="image URL or upload"
                placeholder="enter image URL or choose file to upload"
                fullWidth
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
               <Divider sx={{marginBottom: 2, marginTop: 1}}/>

              
              <Typography variant="h6">Pricing and Inventory</Typography>
                  <Stack direction="row" spacing={0} justifyContent="space-around">
                  <TextField
                    id="input-with-icon-textfield"
                    label="price"
                    name="price"
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
                          0.5
                        ),
                        marginTop: 3
                      }}
                      
                    variant="outlined"
                  />
                  <TextField
                    id="input-with-icon-textfield"
                    label="quantity"
                    name="qty"
                    value={formData.qty}
                    onChange={handleChange}
                    placeholder="enter quantity in stock"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                       
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="off"
                    variant="outlined"
                    sx={{
                        backgroundColor: alpha(
                          theme.palette.primary.contrastText,
                          0.5
                        ),
                        marginTop: 3
                      }}
                  />
               </Stack>

                  <Button
                    color="secondary"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 3 }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AddProduct;                                                     
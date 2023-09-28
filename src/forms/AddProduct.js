import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../static/css/AddProducts.css";
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
  Link,
} from "@mui/material";

const validationSchema = Yup.object({
  productName: Yup.string().required("Product name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  qty: Yup.number()
    .required("Quantity is required")
    .integer("Quantity must be an integer"),
});

const AddProduct = ({ handleAddProduct }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentStore } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      productName: "",
      brand: "",
      productDescription: "",
      categoryName: "",
      image: "",
      price: "",
      qty: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const selectedCategoryName = categorySelected
        ? values.categoryName
        : values.createCategoryName;

      const imageValue =
        values.image.trim() === ""
          ? "https://media.istockphoto.com/id/1452662817/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=bGI_FngX0iexE3EBANPw9nbXkrJJA4-dcEJhCrP8qMw="
          : values.image;

      await handleAddProduct(currentStore.ownerId, currentStore.storeId, {
        ...values,
        categoryName: selectedCategoryName,
        image: imageValue,
      });

      formik.resetForm();
      navigate("/");
    },
  });

  const [categorySelected, setCategorySelected] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName") {
      setCategorySelected(value !== "");
    }

    formik.handleChange(e);
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
                <form onSubmit={formik.handleSubmit}>
                  <Stack direction="row">
                    <Link alignItems="center" onClick={() => navigate("/")}>
                      <ArrowBackIcon
                        fontSize="large"
                        sx={{ color: theme.palette.text, marginTop: 0 }}
                      />
                    </Link>{" "}
                    <Typography variant="h6" mb={1}>
                      Product Details
                    </Typography>
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
                    value={formik.values.productName}
                    onChange={handleChange}
                    error={
                      formik.touched.productName &&
                      Boolean(formik.errors.productName)
                    }
                    helpertext={
                      formik.touched.productName && formik.errors.productName
                    }
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
                    value={formik.values.brand}
                    onChange={formik.handleChange}
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
                    value={formik.values.productDescription}
                    onChange={formik.handleChange}
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
                        value={formik.values.categoryName}
                        onChange={handleChange}
                        error={
                          formik.touched.categoryName &&
                          Boolean(formik.errors.categoryName)
                        }
                        helpertext={
                          formik.touched.categoryName &&
                          formik.errors.categoryName
                        }
                      >
                        {currentStore.categories.map((c) => (
                          <MenuItem value={c.name} key={c.name}>
                            {c.name}
                          </MenuItem>
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
                  {formik.values.categoryName === "" && (
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
                      value={formik.values.createCategoryName}
                      onChange={handleChange}
                    />
                  )}
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography variant="h6">Media</Typography>
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        0.5
                      ),
                    }}
                    label="image URL"
                    placeholder="enter an image URL"
                    fullWidth
                    type="text"
                    name="image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                  />
                  <Divider sx={{ marginBottom: 2, marginTop: 1 }} />
                  <Typography variant="h6">Pricing and Inventory</Typography>
                  <Stack
                    direction="row"
                    spacing={0}
                    justifyContent="space-around"
                  >
                    <TextField
                      id="input-with-icon-textfield"
                      label="price"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
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
                        marginTop: 3,
                      }}
                      variant="outlined"
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helpertext={formik.touched.price && formik.errors.price}
                    />
                    <TextField
                      id="input-with-icon-textfield"
                      label="quantity"
                      name="qty"
                      value={formik.values.qty}
                      onChange={formik.handleChange}
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
                          0.5
                        ),
                        marginTop: 3,
                      }}
                      error={formik.touched.qty && Boolean(formik.errors.qty)}
                      helpertext={formik.touched.qty && formik.errors.qty}
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

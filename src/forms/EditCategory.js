import React, { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../static/css/AddProducts.css";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  alpha,
} from "@mui/material";

const EditCategory = ({ handleEditCategory, handleDeleteCategory }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentStore } = useContext(UserContext);

  const INITIALSTATE = {
    categoryName: "",
  };

  const [formData, setFormData] = useState(INITIALSTATE);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fdata) => ({
      ...fdata,
      [name]: value,
    }));
  };

  const handleCategorySelect = (e) => {
    setSelectedCategoryId(e.target.value);
    setFormData(INITIALSTATE);
  };

  const confirmDelete = () => {
    const result = window.confirm(
      "Warning: Deleting the category will also delete any existing products in the category. Are you sure you want to delete it?"
    );

    if (result) {
      handleDeleteCategory(currentStore.ownerId, selectedCategoryId);
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEditCategory(currentStore.ownerId, selectedCategoryId, {
      categoryName: formData.categoryName,
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
                  <Typography variant="h6" mb={1}>
                    Edit Category
                  </Typography>
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
                        value={selectedCategoryId}
                        onChange={handleCategorySelect}
                      >
                        {currentStore.categories.map((c) => (
                          <MenuItem value={c.id}>{c.name}</MenuItem>
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
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        0.5
                      ),
                      marginBottom: 1,
                    }}
                    label="edit category name"
                    placeholder="enter new category name"
                    fullWidth
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                  />

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
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    marginTop: 3,
                    backgroundColor: alpha(
                      theme.palette.primary.contrastText,
                      0.5
                    ),
                  }}
                  onClick={confirmDelete}
                >
                  Delete Selected Category
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default EditCategory;

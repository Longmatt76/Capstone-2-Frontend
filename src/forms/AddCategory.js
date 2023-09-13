import React, { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import '../static/css/AddProducts.css'
import {
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Container,
  alpha,
} from "@mui/material";

const AddCategory = ({ handleAddCategory }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentStore } = useContext(UserContext);

  const INITIALSTATE = {
    categoryName: "",
  };

  const [formData, setFormData] = useState(INITIALSTATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fdata) => ({
      ...fdata,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddCategory(currentStore.ownerId, currentStore.storeId, formData);
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
                    <Typography variant="h6" mb={1}>Create Category</Typography>
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        0.5
                      ),
                      marginBottom: 1,
                    }}
                    label="category name"
                    placeholder="enter category name"
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
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AddCategory;                                                     
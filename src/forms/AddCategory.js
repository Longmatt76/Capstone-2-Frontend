import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
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

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Category name is required"),
    }),
    onSubmit: async (values) => {
      await handleAddCategory(
        currentStore.ownerId,
        currentStore.storeId,
        values
      );
      formik.resetForm();
      navigate("/");
    },
  });

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
                  <Typography variant="h6" mb={1}>
                    Create Category
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        0.5
                      ),
                      marginBottom: 1,
                    }}
                    label="Category Name"
                    placeholder="Enter category name"
                    fullWidth
                    type="text"
                    name="categoryName"
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.categoryName &&
                      Boolean(formik.errors.categoryName)
                    }
                    helperText={
                      formik.touched.categoryName && formik.errors.categoryName
                    }
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
                                                  
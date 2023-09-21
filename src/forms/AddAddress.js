import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import states from "../helpers/states";
import UserContext from "../contexts/UserContext";
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
  FormControl,
  InputLabel,
  MenuItem,
  alpha
} from "@mui/material";

const AddAddress = ({ handleUserAddress }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
    validationSchema: Yup.object({
      streetAddress: Yup.string().required("Street address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string().required("Zip code is required"),
    }),
    onSubmit: async (values) => {
      await handleUserAddress(currentUser.userId, values);
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
            backgroundColor: alpha("#fff", 0.9),
            marginTop: 20,
            border: `1px solid black`,
          }}
          elevation={0}
        >
          <CardContent>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                textShadow: "1px 1px 1px black",
                backgroundColor: alpha(theme.palette.primary.light, 0.6),
                padding: 2,
                border: "1px solid black",
                borderRadius: "5px",
              }}
              mt={2}
              gutterBottom
              variant="h4"
              align="center"
            >
              Address
            </Typography>
            <Typography
              align="center"
              fontStyle="italic"
              gutterBottom
              variant="subtitle2"
            >
              Save an address to your account for expedited checkout
            </Typography>
            <Divider />

            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              mt={5}
            >
              <Grid xs={12} sm={12} item>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        1
                      ),
                      marginBottom: 1,
                    }}
                    label="Street Address"
                    placeholder="Enter street address"
                    fullWidth
                    type="text"
                    name="streetAddress"
                    value={formik.values.streetAddress}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.streetAddress &&
                      Boolean(formik.errors.streetAddress)
                    }
                    helperText={
                      formik.touched.streetAddress && formik.errors.streetAddress
                    }
                  />
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        1
                      ),
                      marginBottom: 1,
                    }}
                    label="City"
                    placeholder="Enter city of residence"
                    fullWidth
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      sx={{
                        backgroundColor: alpha(
                          theme.palette.primary.contrastText,
                          1
                        ),
                        marginBottom: 1,
                      }}
                      label="State"
                      fullWidth
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      error={formik.touched.state && Boolean(formik.errors.state)}
                      helperText={formik.touched.state && formik.errors.state}
                    >
                      {states.map((state, index) => (
                        <MenuItem key={index} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        1
                      ),
                      marginBottom: 1,
                    }}
                    label="Zip Code"
                    placeholder="Enter zipcode"
                    fullWidth
                    name="zipCode"
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
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

export default AddAddress;


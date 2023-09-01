import React, { useState, useContext } from "react";
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
  Link,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

const EditAddress = ({ handleUserEditAddress, handleUserDeleteAddress }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const INITIALSTATE = {
    streetAddress: currentUser.addresses[0].streetAddress,
    city: currentUser.addresses[0].city,
    state: currentUser.addresses[0].state,
    zipCode: currentUser.addresses[0].zipCode.toString(),
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
    await handleUserEditAddress(currentUser.userId, formData);
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
          sx={{ backgroundColor: theme.palette.secondary.light, marginTop: 10 }}
        >
          <CardContent>
            <Typography
              sx={{
                color: theme.palette.primary.dark,
                textShadow: ".5px .5px 1px black",
              }}
              mt={2}
              gutterBottom
              variant="h4"
              align="left"
            >
              Address
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              Save an address to your account for expidited checkout
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
                <form onSubmit={handleSubmit}>
                  <TextField
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      marginBottom: 1,
                    }}
                    label="street address"
                    placeholder="enter street address"
                    fullWidth
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                  />
                  <TextField
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      marginBottom: 1,
                    }}
                    label="city"
                    placeholder="enter city of residence"
                    fullWidth
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      sx={{
                        backgroundColor: theme.palette.primary.contrastText,
                        marginBottom: 1,
                      }}
                      label="state"
                      fullWidth
                      type="select"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
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
                      backgroundColor: theme.palette.primary.contrastText,
                      marginBottom: 1,
                    }}
                    label="zip code"
                    placeholder="enter zipcode"
                    fullWidth
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />

                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 3 }}
                    type="submit"
                  >
                    Update Address
                  </Button>
                </form>
                <Button
                  color="error"
                  fullWidth
                  variant="contained"
                  sx={{ marginTop: 3 }}
                  onClick={() => {
                    handleUserDeleteAddress(currentUser.userId);
                    navigate("/");
                  }}
                >
                  Delete Address
                </Button>
                <Typography
                  mt={2}
                  align="center"
                  gutterBottom
                  variant="subtitle2"
                >
                  <Divider>
                    {" "}
                    or return{" "}
                    <Link sx={{ textDecoration: "none" }} href="/">
                      home
                    </Link>{" "}
                  </Divider>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default EditAddress;

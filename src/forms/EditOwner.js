import React, { useContext, useState } from "react";
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
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const EditOwner = ({ handleEditOwnerProfile, handleDeleteOwnerProfile }) => {
  const { currentUser } = useContext(UserContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const INITIALSTATE = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
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
    await handleEditOwnerProfile(currentUser.ownerId, formData);
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
            <Typography
              sx={{
                color: theme.palette.primary.main,
                textShadow: "2px 2px 1px black",
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
              Edit Profile
            </Typography>
            <Typography
              textAlign="center"
              fontStyle="italic"
              gutterBottom
              variant="body2"
            >
              Update basic store owner account settings
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
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        0.5
                      ),
                      marginBottom: 1,
                    }}
                    label="first name"
                    placeholder="enter first name"
                    fullWidth
                    type="text"
                    name="firstName"
                    value={formData.firstName}
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
                    label="last name"
                    placeholder="enter last name"
                    fullWidth
                    type="text"
                    name="lastName"
                    value={formData.lastName}
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
                    label="email"
                    placeholder="enter email"
                    fullWidth
                    type="email"
                    name="email"
                    value={formData.email}
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
                    label="username"
                    placeholder="create a unique username"
                    fullWidth
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />

                  <Button
                    color="secondary"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 3 }}
                    type="submit"
                  >
                    Update
                  </Button>
                </form>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    marginTop: 3,
                    marginBottom: 2,
                    backgroundColor: alpha(
                      theme.palette.primary.contrastText,
                      0.5
                    ),
                  }}
                  onClick={() => {
                    handleDeleteOwnerProfile(currentUser.ownerId);
                    navigate("/");
                  }}
                >
                  Delete Profile
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default EditOwner;

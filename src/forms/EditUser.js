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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";


const EditUser = ({ handleEditUserProfile, handleDeleteUserProfile }) => {
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
    await handleEditUserProfile(currentUser.userId ,formData);
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
          sx={{ marginTop: 20 }}
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
              Edit Profile
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              Update basic account settings
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
                    color="primary"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 3 }}
                    type="submit"
                  >
                    Update
                  </Button>
                </form>
                
                <Button
                    color="error"
                    fullWidth
                    variant="outlined"
                    sx={{ marginTop: 3 }}
                    onClick={()=> {
                      handleDeleteUserProfile(currentUser.userId);
                      navigate('/');
                    }}
                    
                  >
                    Delete Profile
                  </Button>
                <Typography
                  mt={2}
                  align="center"
                  gutterBottom
                  variant="subtitle2"
                >
                  <Divider>
                    {" "}
                    or return <Link sx={{textDecoration: 'none'}} href="/">home</Link>{" "}
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

export default EditUser;
import React, {useState} from "react";
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


const LogIn = ({ handleLogIn }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const INITIALSTATE = {
    username: "",
    password: "",
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
    await handleLogIn(formData);
    setFormData(INITIALSTATE);
    navigate("/");
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 20 }}>
        <Card >
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
              Login
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              Welcome back
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
                    label="username"
                    placeholder="enter username"
                    fullWidth
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                  <TextField
                 
                    label="password"
                    type="password"
                    placeholder="enter password"
                    fullWidth
                    name="password"
                    value={formData.password}
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 3 }}
                    type="submit"
                  >
                    Log in
                  </Button>
                </form>
                <Typography
                  mt={2}
                  align="center"
                  gutterBottom
                  variant="subtitle2"
                >
                  <Divider> or </Divider>
                  <Link href="/register-user">
                    <Button
                      fullWidth
                      sx={{
                        marginTop: 2,
                        backgroundColor: theme.palette.secondary.main,
                        color: "black",
                      }}
                    >
                      Sign up
                    </Button>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default LogIn;

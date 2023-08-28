import React from "react";
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


const SignUpOwner = () => {
  const theme = useTheme();
  return (
    <>
      <Container maxWidth="sm" sx={{alignItems: 'center', justifyContent:'center', minHeight: '100vh'}}>
        <Card sx={{ backgroundColor: theme.palette.secondary.light, marginTop: 10 }}>
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
             Register 
            </Typography>
            <Typography gutterBottom variant="subtitle2">Sign up as a store owner to start creating YourStore</Typography>
            <Divider />

            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              mt={5}
            >
              <Grid xs={12} sm={12} item>
                <form>
                <TextField
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      marginBottom: 1,
                    }}
                    label="first name"
                    placeholder="enter first name"
                    fullWidth
                    type="text"
                  />
                <TextField
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      marginBottom: 1,
                    }}
                    label="last name"
                    placeholder="enter last name"
                    fullWidth
                    type="text"
                  />
                <TextField
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      marginBottom: 1,
                    }}
                    label="email"
                    placeholder="enter email"
                    fullWidth
                    type="email"
                  />
                  <TextField
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      marginBottom: 1,
                    }}
                    label="username"
                    placeholder="create a unique username"
                    fullWidth
                  />
                  <TextField
                    sx={{ backgroundColor: theme.palette.primary.contrastText }}
                    label="password"
                    type="password"
                    placeholder="create a password with at least 6 characters"
                    fullWidth
                  />
                  
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 3 }}
                  >
                    Sign Up
                  </Button>
                </form>
                <Typography
                  mt={2}
                  align="center"
                  gutterBottom
                  variant="subtitle2"
                >
                  <Divider> already registered as a store owner? </Divider>
                  <Link href="/login">
                    <Button
                      fullWidth
                      sx={{
                        marginTop: 2,
                        backgroundColor: theme.palette.secondary.main,
                        color: "black",
                      }}
                    >
                      Log In
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

export default SignUpOwner;
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


const LogIn = () => {
  const theme = useTheme();
  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 20 }}>
        <Card sx={{ backgroundColor: theme.palette.secondary.light }}>
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
            <Typography gutterBottom variant="subtitle2">Welcome back</Typography>
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
                    label="username"
                    placeholder="enter username"
                    fullWidth
                  />
                  <TextField
                    sx={{ backgroundColor: theme.palette.primary.contrastText }}
                    label="password"
                    type="password"
                    placeholder="enter password"
                    fullWidth
                  />
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 3 }}
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

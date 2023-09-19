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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';



const LogIn = ({ handleLogIn }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleLogIn(values);
      formik.resetForm();
      navigate('/');
    },
  });
  

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
              <form onSubmit={formik.handleSubmit}>
  <TextField
    sx={{
      marginBottom: 1,
    }}
    label="username"
    placeholder="enter username"
    fullWidth
    name="username"
    value={formik.values.username}
    onChange={formik.handleChange}
    error={formik.touched.username && Boolean(formik.errors.username)}
    helperText={formik.touched.username && formik.errors.username}
    autoComplete="username"
  />
  <TextField
    label="password"
    type="password"
    placeholder="enter password"
    fullWidth
    name="password"
    value={formik.values.password}
    onChange={formik.handleChange}
    error={formik.touched.password && Boolean(formik.errors.password)}
    helperText={formik.touched.password && formik.errors.password}
    autoComplete="current-password"
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
               
                    <Button
                    onClick={() => navigate('/register-user')}
                      fullWidth
                      color="secondary"
                      variant="outlined"
                      sx={{
                        marginTop: 2,
                  
                      }}
                    >
                      Sign up
                    </Button>
              
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

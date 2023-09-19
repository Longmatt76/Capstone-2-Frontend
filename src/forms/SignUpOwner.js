import React  from "react";
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
import { useFormik } from 'formik';
import * as Yup from 'yup';



const SignUpOwner = ({handleOwnerSignup}) => {
  
    const theme = useTheme();
    const navigate = useNavigate();
  
    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    });
    
    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        await handleOwnerSignup(values);
        formik.resetForm();
        navigate('/');
      },
    });
    

  return (
    <>
      <Container maxWidth="sm" sx={{alignItems: 'center', justifyContent:'center', minHeight: '100vh'}}>
        <Card sx={{ marginTop: 20 }}>
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
              <form onSubmit={formik.handleSubmit}>
  <TextField
    sx={{
      marginBottom: 1,
    }}
    label="first name"
    placeholder="enter first name"
    fullWidth
    type="text"
    name="firstName"
    value={formik.values.firstName}
    onChange={formik.handleChange}
    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
    helperText={formik.touched.firstName && formik.errors.firstName}
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
    value={formik.values.lastName}
    onChange={formik.handleChange}
    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
    helperText={formik.touched.lastName && formik.errors.lastName}
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
    value={formik.values.email}
    onChange={formik.handleChange}
    error={formik.touched.email && Boolean(formik.errors.email)}
    helperText={formik.touched.email && formik.errors.email}
  />
  <TextField
    sx={{
      marginBottom: 1,
    }}
    label="username"
    placeholder="create a unique username"
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
    placeholder="create a password with at least 6 characters"
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
               
                    <Button
                    onClick={() => navigate('/login')}
                    variant="outlined"
                    color="secondary"
                      fullWidth
                      sx={{
                        marginTop: 2,
                
                      }}
                    >
                      Log In
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

export default SignUpOwner;
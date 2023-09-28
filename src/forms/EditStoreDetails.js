import React, {useContext, useState} from "react";
import { useTheme } from "@mui/material/styles";
import {  useNavigate } from "react-router-dom";
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
  MenuItem,
  FormControl,
  InputLabel,
  alpha,

} from "@mui/material";



const EditStoreDetails = ({handleEditStoreDetails, handleDeleteStore}) => {
  
    const theme = useTheme();
    const navigate = useNavigate();
    const { currentStore } = useContext(UserContext)

    const INITIALSTATE = {
        storeName: `${currentStore.storeName}`,
        logo: `${currentStore.logo}`,
        theme: `${currentStore.theme}`,
        siteFont: `${currentStore.siteFont}`,
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
        await handleEditStoreDetails(currentStore.ownerId , formData);
        setFormData(INITIALSTATE);
        navigate("/");
      };

  return (
    <>
      <Container maxWidth="sm" sx={{alignItems: 'center', justifyContent:'center', minHeight: '100vh'}}>
        <Card elevation={0} sx={{backgroundColor: alpha(theme.palette.primary.contrastText, .9), marginTop: 20, border: `1px solid black` }}>
          <CardContent>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                textShadow: "1px 1px 1px black",
                backgroundColor: alpha(theme.palette.primary.light,.6),
                padding: 2,
                border: '1px solid black',
                borderRadius: '5px'
               
              }}
              mt={2}
              gutterBottom
              variant="h4"
              align="center"
            >
             Update Store Details
        
            </Typography>
            <Typography textAlign='center' fontStyle='italic' gutterBottom variant="body2">Update {currentStore.storeName}'s basic configuration</Typography>
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
                      backgroundColor: alpha(theme.palette.primary.contrastText, 1),
                      marginBottom: 1
                    }}
                   
                    label="store name"
                    placeholder="enter store name"
                    fullWidth
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                  />
                  <TextField
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.contrastText, 1),
                      marginBottom: 1,
                    }}
                 
                    label="logo"
                    placeholder="enter store logo url"
                    fullWidth
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                  />
                  <FormControl fullWidth>
                    <InputLabel >theme</InputLabel>
                  <Select
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.contrastText, 1),
                      marginBottom: 1,
                    }}
          
                    label="theme"
                    placeholder="choose a color scheme"
                    type="select"
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                  >
                  <MenuItem value={'ThemeOne'}>Blue based theme</MenuItem>
                  <MenuItem value={'ThemeTwo'}>Red based theme</MenuItem>
                  <MenuItem value={'ThemeThree'}>Orange based theme</MenuItem>
                  <MenuItem value={'ThemeFour'}>Yellow based theme</MenuItem>
                  <MenuItem value={'ThemeFive'}>Green based theme</MenuItem>
                  <MenuItem value={'ThemeSix'}>Dark mode theme</MenuItem>
                </Select>
                </FormControl>
                  <FormControl fullWidth>
                    <InputLabel  >site font</InputLabel>
                  <Select
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.contrastText, 1),
                      marginBottom: 1, 
                    }}
                    label="site font"
                    placeholder="choose a main font"
                    type="select"
                    name="siteFont"
                    value={formData.siteFont}
                    onChange={handleChange}
                  >
                  <MenuItem value={'Roboto'}>Roboto</MenuItem>
                  <MenuItem value={'Montserrat'}>Montserrat</MenuItem>
                  <MenuItem value={'Merriweather'}>Merriweather</MenuItem>
                  <MenuItem value={'Lato'}>Lato</MenuItem>
                  <MenuItem value={'Oswald'}>Oswald</MenuItem>
                  <MenuItem value={'Playfair Display'}>Playfair Display</MenuItem>
                </Select>
                </FormControl>
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
                <Button
                    
                    fullWidth
                    variant="outlined"
                    sx={{ marginTop: 3, backgroundColor: alpha(theme.palette.primary.contrastText, 1) }}
                    onClick={() => {
                      handleDeleteStore(currentStore.ownerId);
                      navigate('/');
                    }}
                 
                  >
                    Delete Store
                  </Button>
                <Typography
                  mt={2}
                  align="center"
                  gutterBottom
                  variant="subtitle2"
                >
                  {/* <Divider> or return <Link sx={{color: theme.palette.error.main, textDecoration: 'none'}} href={'/'}>home</Link></Divider> */}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default EditStoreDetails;
import React, { useContext, useState, useEffect, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { CarouselContext } from "../contexts/CarouselContext";
import YourStoreAPI from "../api";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Container,
  Divider,
  alpha,
  Switch,
  FormControlLabel,
  Stack,
} from "@mui/material";

const EditCarousel = ({ handleEditCarousel}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentStore } = useContext(UserContext);
  const {carousel, setCarousel ,isCarousel, setIsCarousel, isDarkText, setIsDarkText} = useContext(CarouselContext);

  const mountCarousel = useCallback(async function (ownerId, storeId) {
    const carousel = await YourStoreAPI.getCarousel(ownerId, storeId);
    setCarousel(carousel);
  }, [setCarousel]);

  useEffect(() => {
    if (currentStore) {
      mountCarousel(currentStore.ownerId, currentStore.storeId);
    }
  }, [currentStore, mountCarousel]);

  const INITIALSTATE = {
    imageOne: `${carousel.imageOne}`,
    imageOneHeader:  `${carousel.imageOneHeader}`,
    imageOneText:  `${carousel.imageOneText}`,
    imageTwo:  `${carousel.imageTwo}`,
    imageTwoHeader:  `${carousel.imageTwoHeader}`,
    imageTwoText:  `${carousel.imageTwoText}`,
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
    await handleEditCarousel(currentStore.ownerId, currentStore.storeId, formData);
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
          elevation={0}
          sx={{
            marginTop: 20,
            backgroundColor: alpha(theme.palette.primary.contrastText, .9),
            border: `1px solid black`,
          }}
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
              Customize Carousel
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle2"
              align="center"
              fontStyle="italic"
            >
              Add images and captions to the home screen carousel!
            </Typography>
            <Divider />
            <Stack direction="row" spacing={3} justifyContent='space-around'>
            <FormControlLabel
              sx={{ marginTop: 2, marginBottom: 0 }}
              control={<Switch checked={isCarousel ? true : false} onClick={() => setIsCarousel(!isCarousel)} />}
              label={
                <Typography variant="subtitle2">disable / enable </Typography>
              }
            />
            <FormControlLabel
              sx={{ marginTop: 2, marginBottom: 0 }}
              control={<Switch checked={isDarkText ? false : true} onClick={() => setIsDarkText(!isDarkText)} />}
              label={
                <Typography variant="subtitle2">dark text / light text </Typography>
              }
            />
            </Stack>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              mt={1}
            >
              <Grid xs={12} sm={12} item>
                <form onSubmit={handleSubmit}>
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        1
                      ),
                      marginBottom: 1,
                    }}
                    label="image one"
                    placeholder="enter url for image one"
                    fullWidth
                    type="text"
                    name="imageOne"
                    value={formData.imageOne}
                    onChange={handleChange}
                  />
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        1
                      ),
                      marginBottom: 1,
                    }}
                    label="image one header caption"
                    placeholder="enter caption for header of image one"
                    fullWidth
                    type="text"
                    name="imageOneHeader"
                    value={formData.imageOneHeader}
                    onChange={handleChange}
                  />
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        1
                      ),
                      marginBottom: 1,
                    }}
                    label="image one body caption"
                    placeholder="enter caption for body of image one"
                    fullWidth
                    type="text"
                    name="imageOneText"
                    value={formData.imageOneText}
                    onChange={handleChange}
                  />
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        1
                      ),
                      marginBottom: 1,
                    }}
                    label="image two"
                    placeholder="enter url for image two"
                    fullWidth
                    type="text"
                    name="imageTwo"
                    value={formData.imageTwo}
                    onChange={handleChange}
                  />
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        1
                      ),
                      marginBottom: 1,
                    }}
                    label="image two header caption"
                    placeholder="enter caption for image two header"
                    fullWidth
                    type="text"
                    name="imageTwoHeader"
                    value={formData.imageTwoHeader}
                    onChange={handleChange}
                  />
                  <TextField
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.primary.contrastText,
                        1
                      ),
                      marginBottom: 1,
                    }}
                    label="image two body caption"
                    placeholder="enter caption for body of image two"
                    fullWidth
                    type="text"
                    name="imageTwoText"
                    value={formData.imageTwoText}
                    onChange={handleChange}
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

export default EditCarousel;

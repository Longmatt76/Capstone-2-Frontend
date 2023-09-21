import {
  CCarousel,
  CImage,
  CCarouselCaption,
  CCarouselItem,
} from "@coreui/react";
import React, { useContext, useEffect } from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import UserContext from "./contexts/UserContext";
import { CarouselContext } from "./contexts/CarouselContext";
import { useTheme } from "@mui/material/styles";
import YourStoreAPI from "./api";

const Carousel = () => {
  const theme = useTheme();
  const { currentStore } = useContext(UserContext);
  const { isCarousel, setIsCarousel, carousel, setCarousel } =
    useContext(CarouselContext);

  const mountCarousel = async function (ownerId, storeId) {
    const carousel = await YourStoreAPI.getCarousel(ownerId, storeId);
    console.log("carousel", carousel);
    setCarousel(carousel);
  };

  useEffect(() => {
    if (currentStore) {
      mountCarousel(currentStore.ownerId, currentStore.storeId);
    }
  }, []);

  console.log(carousel);

  return (
    <>
      <Box>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            paddingTop: 15,
            paddingBottom: 5,
            borderRadius: 0,
          }}
        >
          {" "}
          <Grid container justifyContent="center">
            <Grid item xs={8}>
              <CCarousel controls>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    height={300}
                    src={
                      carousel.imageOne
                        ? carousel.imageOne
                        : "https://cdn.wallpapersafari.com/26/29/4wPCax.jpg"
                    }
                    alt="slide 1"
                  />
                  <CCarouselCaption className="d-none d-md-block">
                    <Typography
                      color={theme.palette.primary.contrastText}
                      variant="h4"
                    >
                      {carousel.imageOneHeader
                        ? carousel.imageOneHeader
                        : "Welcome to YourStore"}
                    </Typography>
                    <Typography
                      color={theme.palette.primary.contrastText}
                      variant="subtitle1"
                    >
                      {carousel.imageOneText
                        ? carousel.imageOneText
                        : "Customize your carousel in the manage store panel"}
                    </Typography>
                  </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    height={300}
                    src={
                      carousel.imageTwo
                        ? carousel.imageTwo
                        : "https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-5120x2880-8324.png"
                    }
                    alt="slide 2"
                  />
                  <CCarouselCaption className="d-none d-md-block">
                    <Typography
                      color={theme.palette.primary.contrastText}
                      variant="h4"
                    >
                      {carousel.imageTwoHeader
                        ? carousel.imageTwoHeader
                        : "Build your own store!"}
                    </Typography>
                    <Typography
                      color={theme.palette.primary.contrastText}
                      variant="subtitle1"
                    >
                      {carousel.imageTwoText
                        ? carousel.imageTwoText
                        : "Click create store to start building your own store in minutes!"}
                    </Typography>
                  </CCarouselCaption>
                </CCarouselItem>
              </CCarousel>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Carousel;

import {
  CCarousel,
  CImage,
  CCarouselCaption,
  CCarouselItem,
} from "@coreui/react";

import { Typography, Box, Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Carousel = () => {
  const theme = useTheme();

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
                    src={"https://cdn.wallpapersafari.com/26/29/4wPCax.jpg"}
                    alt="slide 1"
                  />
                  <CCarouselCaption className="d-none d-md-block">
                    <Typography
                      color={theme.palette.primary.contrastText}
                      variant="h4"
                    >
                      First slide label
                    </Typography>
                    <Typography
                      color={theme.palette.primary.contrastText}
                      variant="subtitle1"
                    >
                      Some representative placeholder content for the first
                      slide.
                    </Typography>
                  </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                  <CImage
                    className="d-block w-100"
                    height={300}
                    src={
                      "https://loriballen.com/wp-content/uploads/2022/01/web-page-under-construction.jpeg"
                    }
                    alt="slide 2"
                  />
                  <CCarouselCaption className="d-none d-md-block">
                    <Typography
                      color={theme.palette.primary.contrastText}
                      variant="h4"
                    >
                      Second slide label
                    </Typography>
                    <Typography
                      color={theme.palette.primary.contrastText}
                      variant="subtitle1"
                    >
                      Some representative placeholder content for the second
                      slide.
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

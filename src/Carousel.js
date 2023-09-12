import {
  CCarousel,
  CImage,
  CCarouselCaption,
  CCarouselItem,
} from "@coreui/react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";


const Carousel = () => {
  const theme = useTheme();

  return (
    <>
      <CCarousel controls>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            height={300}
           
            src={
              "https://cdn.wallpapersafari.com/26/29/4wPCax.jpg"
            }
            alt="slide 1"
          />
          <CCarouselCaption dark className="d-none d-md-block">
            <Typography color={theme.palette.primary.contrastText} variant="h4">First slide label</Typography>
            <Typography color={theme.palette.primary.contrastText} variant="subtitle1">
              Some representative placeholder content for the first slide.
            </Typography>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            height={300}
          
            src={
              "https://wallpapers.com/images/featured/black-wuuaobghtdllhliu.jpg"
            }
            alt="slide 2"
          />
          <CCarouselCaption dark className="d-none d-md-block">
            <Typography color={theme.palette.primary.contrastText} variant="h4">Second slide label</Typography>
            <Typography color={theme.palette.primary.contrastText} variant="subtitle1">
              Some representative placeholder content for the second slide.
            </Typography >
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
    </>
  );
};

export default Carousel;

import React from "react";

import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Card,
  Divider,
  Stack,
  CardMedia,
  CardContent,
  Alert,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const ProductCard = ({
  productId,
  title,

  price,
  qty,
  image,
  category,
  brand,
  storeId,
}) => {
  const theme = useTheme();

  return (
    <>
      <NavLink
        to={`/stores/${storeId}/product-details/${productId}`}
        className="productCards"
      >
        <Card raised={true}>
          <div style={{ position: "relative" }}>
            <Alert
              icon={false}
              sx={{
                position: "absolute",
                top: 10,
                left: 0,
                paddingTop: 0,
                paddingBottom: 0,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              {category}
            </Alert>
            <CardMedia
              component="img"
              height={240}
              image={`${image}`}
              alt={title}
            />
          </div>
          <CardContent>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              justifyContent="center"
            >
              {" "}
              <Typography color={theme.palette.text.secondary} variant="body2">
                Brand:
              </Typography>
              <Typography textAlign="center" variant="subtitle2">
                {brand ? brand : "unknown"}
              </Typography>
            </Stack>

            <Divider />
            <Typography textAlign="center" mt={1} gutterBottom variant="h6">
              {title}
            </Typography>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              justifyContent="center"
            >
              <Typography color={theme.palette.text.secondary} variant="body2">
                Price:
              </Typography>
              <Typography
                textAlign="center"
                fontWeight="bold"
                variant="subtitle1"
              >
                ${price}
              </Typography>
            </Stack>
            <Typography
              my={1}
              fontStyle="italic"
              textAlign="center"
              color={theme.palette.primary.main}
              variant="body2"
            >
              Only {qty} left!
            </Typography>
            <Divider
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: `${40}%`,
                marginLeft: 9,
              }}
            />
          </CardContent>
        </Card>
      </NavLink>
    </>
  );
};

export default ProductCard;

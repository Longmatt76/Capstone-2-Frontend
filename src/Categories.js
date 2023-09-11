import React, { useContext } from "react";
import UserContext from "./contexts/UserContext";
import { useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Typography,
  Card,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  CardMedia,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
const Categories = () => {
  const { currentUser, currentStore } = useContext(UserContext);
  const theme = useTheme();

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: 20 }}>
        <Paper>
          <Card sx={{ padding: 5 }}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
              p={1}
              mb={1}
            >
              Categories
            </Typography>
            <CardMedia
              component="img"
              height="inherit"
              image={require("./static/images/find-trending-products-sell-ecommerce.png")}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ padding: 2 }}
            >
              {" "}
              <NavLink   to={`/stores/${currentUser.ownerId}/add-categories/${currentStore.storeId}`}>
                <Button style={{ marginLeft: 50 }} size="large">
                  Add Categories
                </Button>
              </NavLink>
              <Link alignItems="center" href="/">
                <ArrowBackIcon fontSize="large" sx={{ color: theme.palette.text, marginTop: 0}} />
              </Link>
              <NavLink
                to={`/stores/${currentUser.ownerId}/edit-categories/${currentStore.storeId}`}
              >
                <Button style={{ marginRight: 50 }} size="large">
                  Edit Categories
                </Button>
              </NavLink>
            </Stack>
            <Divider />
          </Card>
        </Paper>
      </Container>
    </>
  );
};
export default Categories;
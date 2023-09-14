import React, { useContext, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  TextField,
  InputAdornment,
  Container,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import YourStoreAPI from "../api";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.3),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.4),
  },
  marginRight: theme.spacing(10),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(-2),
    width: "auto",
  },
}));

const SearchBar = () => {
  const { currentStore } = useContext(UserContext);
  
  const [categories, setCategories] = useState([]);

  async function mountCategories(ownerId, storeId) {
    let categories = await YourStoreAPI.getCategories(ownerId, storeId);
    setCategories(categories);
  }

  useEffect(() => {
    if (currentStore) {
      mountCategories(currentStore.ownerId, currentStore.storeId);
    }
  }, [currentStore]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 1 }}>
      <Search>
        <TextField
          fullWidth
          type="text"
          placeholder="Search products"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button>
                  <SearchIcon style={{ color: "white" }} />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Search>
      {categories && (
        <Stack direction="row" spacing={3} my={0.5} alignContent="flex-start">
          {categories.map((category) => (
            <NavLink key={category.categoryId} to={`/stores/${currentStore.storeId}/categories/${category.categoryId}`}>
              <Typography variant="subtitle2">{category.categoryName}</Typography>
            </NavLink>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default SearchBar;

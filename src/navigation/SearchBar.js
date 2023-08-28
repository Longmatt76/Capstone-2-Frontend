import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment, Container, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

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
    return (
      <>
        <Container maxWidth="sm">
          <Search>
            <TextField
              type="text"
              placeholder="Search products"
              size="small"
              sx={{
                width: "100%",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button>
                      <SearchIcon style={{ color: 'white' }} />
                    </Button>
                  </InputAdornment>
                ),
              }}
            /> 
          </Search>
        </Container>
      </>
    );
  };

export default SearchBar;


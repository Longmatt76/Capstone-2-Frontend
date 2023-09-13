import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
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

const ProductDetails = () => {
    return (
        <>
        <Typography variant="h1" textAlign="center" sx={{marginTop: 20}}>Yo what up, fuckskie?</Typography>
        </>
    )
}

export default ProductDetails; 
import { Container, Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
    const navigate = useNavigate();
    return (  
        <>
           <Container sx={{ marginTop: 30 }}>
        <Stack py={3}>
          <Typography textAlign="center" variant="h2">
            Checkout Successful! Track your orders in the orders tab
          </Typography>
          <Button sx={{marginTop: 2}} onClick={() => navigate("/")}>Continue Shopping</Button>
        </Stack>
      </Container>
        </>
    )
}

export default CheckoutSuccess; 
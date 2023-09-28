import { Container, Stack, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useLoadStore from "../hooks/useLoadStore";

const CheckoutSuccess = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();

    useLoadStore(storeId);
    
    return (  
        <>
           <Container sx={{ marginTop: 30 }}>
        <Stack py={3}>
          <Typography textAlign="center" variant="h2">
            Checkout Successful!
          </Typography>
          <Button sx={{marginTop: 2}} onClick={() => navigate(`/${storeId}`)}>Continue Shopping</Button>
        </Stack>
      </Container>
        </>
    )
}

export default CheckoutSuccess; 
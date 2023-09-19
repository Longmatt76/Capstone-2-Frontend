import { Container, Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ marginTop: 30 }}>
        <Stack py={3}>
          <Typography textAlign="center" variant="h2">
            404 Page not found!
          </Typography>
          <Button sx={{marginTop: 2}} onClick={() => navigate("/")}>Go Home</Button>
        </Stack>
      </Container>
    </>
  );
};

export default NotFound;

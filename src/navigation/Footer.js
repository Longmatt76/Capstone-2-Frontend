import { Box, Typography, Stack, Grid,} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        height={70}
        color={theme.palette.primary.contrastText}
        width={`${100}%`}
        position="fixed"
        bottom={0}
        sx={{ backgroundColor: theme.palette.primary.main }}
        p={2}
      >
        <Grid container>
          <Grid item xs={4}>
            {" "}
          
          </Grid>
          <Grid item xs={4}>
            {" "}
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle1">
                <CopyrightIcon /> 2023 YourStore All Rights Reserved
              </Typography>
              <Stack direction="row" spacing={5}>
                {" "}
                <Typography variant="body1" textAlign="center" fontSize="small">
                  longm7676@gmail.com
                </Typography>
               
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            {" "}
      
          </Grid>
        </Grid>
      </Box>
      ;
    </>
  );
};

export default Footer;

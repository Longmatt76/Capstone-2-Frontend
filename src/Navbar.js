import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import AccessibleIcon from '@mui/icons-material/Accessible';


const Navbar = () => {
    return (
       <AppBar position="static">
        <Toolbar>
       <IconButton size="large" edge="start" color="inherit"> 
       <AccessibleIcon/>
       </IconButton>
       <Typography variant="h6" component='div' sx={ {flexGrow: 1} }>
        YOURSTORE
       </Typography>
       <Stack direction='row' spacing={2}>
        <Button color="inherit">Features</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Products</Button>
        <Button color="inherit">Login</Button>
       </Stack>
        </Toolbar>
       </AppBar>
    )
}

export default Navbar; 

import { createTheme } from "@mui/material";

const ThemeOne = createTheme({
    palette: {
        mode: 'dark',
       primary: { 
        main: '#1976d2',
        light: '#e3f2fd',
        dark: '#1565c0',
        contrastText: '#fff'
    },
    secondary: {
        main: '#9db7d0',
        light: '#FAF9F6',
        dark: '#496f91',
        contrastText: '#fff'
    },
    
},
typography: {
    fontFamily: '"Merriweather"',
},
});







export {
    ThemeOne
}


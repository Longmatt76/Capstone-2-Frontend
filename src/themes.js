
import { createTheme } from "@mui/material";

let currentStore;
const ThemeOne = createTheme({
    palette: {
        mode: 'light',
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
    fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`
  }
  
  });
  
  
  
  const ThemeTwo = createTheme({
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
    fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`
  }
  });
  
  const ThemeThree = createTheme({
    palette: {
        mode: 'light',
       primary: { 
        main: '#e38f0c',
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
    fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`
  }
  
  
  });
  
  const ThemeFour = createTheme({
    palette: {
        mode: 'light',
       primary: { 
        main: '#7a7a7a',
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
    fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`
  }
  
  });
  const ThemeFive = createTheme({
    palette: {
        mode: 'light',
       primary: { 
        main: '#f71717',
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
    fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`
  }
  
  });
  


export {
    ThemeOne,
    ThemeTwo, 
    ThemeThree,
    ThemeFour,
    ThemeFive
}


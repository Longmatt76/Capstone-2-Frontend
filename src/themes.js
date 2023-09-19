import { createTheme } from "@mui/material";

const ThemeOne = (currentStore) =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
        light: "#e3f2fd",
        dark: "#1565c0",
        contrastText: "#fff",
      },
      secondary: {
        main: "#202124",
        light: "#e5e5e5",
        dark: "#000000",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`,
    },
  });

const ThemeTwo = (currentStore) =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#e33e3b",
        light: "#ed9b9d",
        dark: "#b42423",
        contrastText: "#fff",
      },
      secondary: {
        main: "#202124",
        light: "#e5e5e5",
        dark: "#000000",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`,
    },
  });

const ThemeThree = (currentStore) =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ff633c",
        light: "#ffa58c",
        dark: "#d82f0a",
        contrastText: "#fff",
      },
      secondary: {
        main: "#202124",
        light: "#e5e5e5",
        dark: "#000000",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`,
    },
  });

const ThemeFour = (currentStore) =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#e2c505",
        light: "#f6f3bc",
        dark: "#e09600",
        contrastText: "#fff",
      },
      secondary: {
        main: "#202124",
        light: "#e5e5e5",
        dark: "#000000",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`,
    },
  });
const ThemeFive = (currentStore) =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#238470",
        light: "#b4ddd6",
        dark: "#144839",
        contrastText: "#fff",
      },
      secondary: {
        main: "#202124",
        light: "#e5e5e5",
        dark: "#000000",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`,
    },
  });

const ThemeSix = (currentStore) =>
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
        light: "#e9e9e9",
        dark: "#9d9e9f",
        contrastText: "#000000",
      },
      secondary: {
        main: "#202124",
        light: "#202124",
        dark: "#000000",
        contrastText: "#000000",
      },
    },
    typography: {
      fontFamily: `${currentStore ? currentStore.siteFont : "Roboto"}`,
    },
  });

const themes = {
  ThemeOne,
  ThemeTwo,
  ThemeThree,
  ThemeFour,
  ThemeFive,
  ThemeSix,
};

export default themes;

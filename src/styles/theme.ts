import type { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
  primary: "#1976D2",
  secondary: "#be52f2",
  warning: "#ffcf5c",
  danger: "#ff647c",
  success: "#00c48c",
  info: "#0084f4",
  darkest: "#1A051D",
  lightest: "#ffffff",
  neutral: "#3f3356",
  neutralLight: "#d0c9d6",
  neutralLighter: "#ecebed",
  neutralLightest: "#f7f5f9",
  shadow: "rgba(0, 0, 0, 0.07)",
  shadowDarkest: "rgba(0, 0, 0, 0.25)",
  primaryBackground: "#fff",
};

const createTheme = (theme: Partial<DefaultTheme>): DefaultTheme => ({
  ...defaultTheme,
  ...theme,
});

const darkTheme = createTheme({
  primaryBackground: "#1a1d41",
});

export { defaultTheme, darkTheme };

import { createGlobalStyle } from "styled-components";
import "react-datepicker/dist/react-datepicker.min.css";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    background-color: ${(props) => props.theme.primaryBackground};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 1rem;
    color: ${(props) => props.theme.darkest};
    box-sizing: border-box;
    scrollbar-color: ${(props) => props.theme.primary} ${(props) => props.theme.neutralLighter};
    scrollbar-width: thin;
  }

  ::-webkit-scrollbar {
    width: 0.4rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.4rem;
    background-color: ${(props) => props.theme.primary};
  }

  ::-webkit-scrollbar-track {
    border-radius: 0.4rem;
    background-color: ${(props) => props.theme.neutralLighter};
  }

`;

export { GlobalStyles };

import { createGlobalStyle } from "styled-components";
import "react-datepicker/dist/react-datepicker.min.css";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background-color: white;
    padding: 0 !important;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    font-size: 1rem;
  }
`;

export { GlobalStyles };

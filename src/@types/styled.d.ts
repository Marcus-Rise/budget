import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: Color;
    primaryLight: Color;
    primaryLighter: Color;
    secondary: Color;
    secondaryLight: Color;
    secondaryLighter: Color;
    warning: Color;
    warningLight: Color;
    warningLighter: Color;
    danger: Color;
    dangerLight: Color;
    dangerLighter: Color;
    success: Color;
    successLight: Color;
    successLighter: Color;
    info: Color;
    infoLight: Color;
    infoLighter: Color;
    darkest: Color;
    lightest: Color;
    neutral: Color;
    neutralLight: Color;
    neutralLighter: Color;
    neutralLightest: Color;
    shadow: Color;
    shadowDarkest: Color;
    primaryBackground: Color;
  }
}

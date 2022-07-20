import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: Color;
    secondary: Color;
    warning: Color;
    danger: Color;
    success: Color;
    info: Color;
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

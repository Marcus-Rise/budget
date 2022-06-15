import type { FC, PropsWithChildren } from "react";
import type { DefaultTheme } from "styled-components";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles/theme";
import Head from "next/head";
import { GlobalStyles } from "../../../styles/global";
import { PopupProvider } from "../popup";

type LayoutGlobalProps = PropsWithChildren<{ theme?: DefaultTheme }>;

const LayoutGlobal: FC<LayoutGlobalProps> = ({ children, theme = defaultTheme }) => (
  <>
    <Head>
      <title>Бюджет</title>
      <meta name={"description"} content={"Учет бюджета"} />
      <meta name={"theme-color"} content={theme.primary} />
    </Head>
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <PopupProvider>{children}</PopupProvider>
    </ThemeProvider>
  </>
);

export { LayoutGlobal };

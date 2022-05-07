import type { FC, PropsWithChildren } from "react";
import type { DefaultTheme } from "styled-components";
import { defaultTheme } from "../../../styles/theme";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../styles/global";

type LayoutGlobalProps = PropsWithChildren<{ theme?: DefaultTheme }>;

const LayoutGlobal: FC<LayoutGlobalProps> = ({ children, theme = defaultTheme }) => {
  return (
    <>
      <Head>
        <title>Бюджет</title>
        <meta name={"description"} content={"Учет бюджета"} />{" "}
        <meta name={"theme-color"} content={theme.primary} />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </>
  );
};

export { LayoutGlobal };

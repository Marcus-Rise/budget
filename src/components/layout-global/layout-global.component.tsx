import type { FC, PropsWithChildren } from "react";
import { useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, defaultTheme } from "../../styles/theme";
import Head from "next/head";
import { GlobalStyles } from "../../styles/global";
import { PopupProvider } from "../popup";
import { useTheme } from "@marcus-rise/react-theme";

type LayoutGlobalProps = PropsWithChildren<unknown>;

const LayoutGlobal: FC<LayoutGlobalProps> = ({ children }) => {
  const { isDarkTheme } = useTheme();

  const currentTheme = useMemo(() => (isDarkTheme ? darkTheme : defaultTheme), [isDarkTheme]);

  return (
    <>
      <Head>
        <title>Бюджет</title>
        <meta name={"description"} content={"Учет бюджета"} />
        <meta name={"theme-toggle-color"} content={currentTheme.primaryBackground} />
      </Head>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <PopupProvider>{children}</PopupProvider>
      </ThemeProvider>
    </>
  );
};

export { LayoutGlobal };

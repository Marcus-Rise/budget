import type { FC, PropsWithChildren } from "react";
import type { DefaultTheme } from "styled-components";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../styles/theme";
import Head from "next/head";
import { GlobalStyles } from "../../../styles/global";
import { Popup, PopupProvider } from "../popup";
import { UserProvider } from "../../user";

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

      <UserProvider>
        <PopupProvider>
          <Popup />
          {children}
        </PopupProvider>
      </UserProvider>
    </ThemeProvider>
  </>
);

export { LayoutGlobal };

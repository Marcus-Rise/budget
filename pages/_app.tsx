import type { AppProps } from "next/app";
import { LayoutGlobal } from "../src/components/layout-global";
import { UserProvider } from "../src/user";
import type { FC } from "react";
import { ThemeProvider } from "@marcus-rise/react-theme";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider>
    <UserProvider>
      <LayoutGlobal>
        <Component {...pageProps} />
      </LayoutGlobal>
    </UserProvider>
  </ThemeProvider>
);

export default MyApp;

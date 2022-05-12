import type { AppProps } from "next/app";
import { LayoutGlobal } from "../src/components/layout-global";
import { UserProvider } from "../src/user";
import type { FC } from "react";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <UserProvider>
    <LayoutGlobal>
      <Component {...pageProps} />
    </LayoutGlobal>
  </UserProvider>
);

export default MyApp;

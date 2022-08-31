import type { AppProps } from "next/app";
import "reflect-metadata";
import { LayoutGlobal } from "../src/components/layout-global";
import type { FC } from "react";
import { ContainerProvider } from "../src/ioc";
import { container } from "../src/ioc/container";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ContainerProvider container={container}>
    <LayoutGlobal>
      <Component {...pageProps} />
    </LayoutGlobal>
  </ContainerProvider>
);

export default MyApp;

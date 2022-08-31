import type { AppProps } from "next/app";
import "reflect-metadata";
import { LayoutGlobal } from "../src/components/layout-global";
import type { FC } from "react";
import { ContainerModuleLoader, ContainerProvider } from "../src/ioc";
import { container } from "../src/ioc/container";
import { UserModule } from "../src/user/ioc";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ContainerProvider container={container}>
    <ContainerModuleLoader modules={[UserModule]}>
      <LayoutGlobal>
        <Component {...pageProps} />
      </LayoutGlobal>
    </ContainerModuleLoader>
  </ContainerProvider>
);

export default MyApp;

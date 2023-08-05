import type { AppProps } from "next/app";
import "reflect-metadata";
import { LayoutGlobal } from "../src/components/layout-global";
import type { FC } from "react";
import { ContainerProvider } from "../src/ioc";
import { container } from "../src/ioc/container";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ContainerProvider container={container}>
      <LayoutGlobal>{getLayout(<Component {...pageProps} />)}</LayoutGlobal>
    </ContainerProvider>
  );
};

export default MyApp;

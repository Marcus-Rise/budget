import type { AppProps } from "next/app";
import { LayoutGlobal } from "../src/components/layout-global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutGlobal>
      <Component {...pageProps} />
    </LayoutGlobal>
  );
}

export default MyApp;

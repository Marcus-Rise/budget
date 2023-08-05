import type { FC, ReactElement, SVGProps } from "react";
import type { NextPage } from "next";

declare global {
  type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

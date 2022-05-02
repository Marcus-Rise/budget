import type { FC } from "react";
import { Header } from "./components/header";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export { Layout };

import type { FC } from "react";
import { Header } from "./components/header";
import { Popup } from "../popup";
import styled from "styled-components";

const Main = styled.main`
  position: relative;
  min-height: 100vh;
`;

const LayoutPrivate: FC = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <Popup />
        {children}
      </Main>
    </>
  );
};

export { LayoutPrivate };

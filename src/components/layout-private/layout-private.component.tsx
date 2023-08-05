import type { FC } from "react";
import { Header } from "./components/header";
import { Popup } from "../popup";
import styled from "styled-components";
import { ContainerModuleLoader } from "../../ioc";
import { UserModule } from "../../user/ioc";
import type { IUserService } from "../../user";
import { useEffect } from "react";

const Main = styled.main`
  position: relative;
  min-height: 100vh;
`;

const LayoutPrivate: FC<{ userService: IUserService }> = ({ userService, children }) => {
  useEffect(() => {});

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

const Wrapper: FC = ({ children }) => (
  <ContainerModuleLoader modules={[UserModule]}>{children}</ContainerModuleLoader>
);

export { LayoutPrivate };

import styled from "styled-components";
import type { FC } from "react";
import { useEffect } from "react";

const Root = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Overlay: FC = ({ children }) => {
  useEffect(() => {
    const body = document.getElementsByTagName("body");

    body[0].style.overflowY = "hidden";

    return () => {
      body[0].style.overflowY = "auto";
    };
  }, []);

  return <Root>{children}</Root>;
};

export { Overlay };

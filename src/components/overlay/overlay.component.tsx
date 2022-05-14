import styled from "styled-components";
import type { ComponentProps, FC } from "react";
import { useEffect } from "react";

const Root = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

type OverlayProps = ComponentProps<typeof Root>;

const Overlay: FC<OverlayProps> = (props) => {
  useEffect(() => {
    const body = document.getElementsByTagName("body");

    body[0].style.overflowY = "hidden";

    return () => {
      body[0].style.overflowY = "auto";
    };
  }, []);

  return <Root {...props} />;
};

export { Overlay };

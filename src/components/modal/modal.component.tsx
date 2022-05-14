import styled from "styled-components";
import type { FC, MouseEventHandler } from "react";
import { Container } from "../container";
import { Overlay } from "../overlay";
import { Card } from "../card";

const ModalCard = styled(Card)`
  z-index: 9;
  width: auto;
`;

const ModalContainer = styled(Container)`
  height: 100vh;
  align-items: center;
`;

type ModalProps = { show: boolean; onClose?: () => void };

const Modal: FC<ModalProps> = ({ children, show, onClose }) => {
  if (!show) {
    return null;
  }

  const preventPropagation: MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer centered>
        <ModalCard shadow onClick={preventPropagation}>
          {children}
        </ModalCard>
      </ModalContainer>
    </Overlay>
  );
};

export { Modal };
export type { ModalProps };

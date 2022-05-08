import styled from "styled-components";
import type { ReactElement } from "react";
import { Icon } from "../icon";
import { Button, ButtonVariant } from "../button";

enum PopupType {
  SUCCESS = "success",
  DANGER = "danger",
  INFO = "info",
}

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonClose = styled(Button).attrs(() => ({
  variant: ButtonVariant.ICON,
  color: "inherit",
}))``;

const Popup = styled.div.attrs<
  { onClose?: () => void; type: PopupType; children: ReactElement },
  { type?: PopupType; onClose?: () => void }
>(({ children, onClose, type }) => {
  const iconName: string = type === PopupType.SUCCESS ? "success" : "info";

  return {
    type,
    children: (
      <>
        <Content>
          <Icon name={iconName} />
          {children}
        </Content>
        <ButtonClose onClick={onClose}>
          <Icon name={"close"} size={"1.5rem"} />
        </ButtonClose>
      </>
    ),
  };
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1rem;
  border-radius: 0.5rem;

  background-color: ${(props) => {
    switch (props.type) {
      case PopupType.DANGER: {
        return props.theme.danger;
      }
      case PopupType.SUCCESS: {
        return props.theme.success;
      }
      default: {
        return props.theme.info;
      }
    }
  }};
  color: ${(props) => props.theme.lightest};
  fill: ${(props) => props.theme.lightest};

  * {
    color: ${(props) => props.theme.lightest};
    fill: ${(props) => props.theme.lightest};
  }
`;

export { Popup, PopupType };

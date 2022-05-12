import styled from "styled-components";
import type { FC, ReactElement } from "react";
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

const PopupStyled = styled.div.attrs<
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

const Wrapper = styled.div`
  position: fixed;
  top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Popup: FC<{ title: string; type: PopupType; onClose: () => void }> = ({
  type,
  title,
  onClose,
}) => {
  return (
    <Wrapper>
      <PopupStyled type={type} onClose={onClose}>
        {title}
      </PopupStyled>
    </Wrapper>
  );
};

export { Popup, PopupType };

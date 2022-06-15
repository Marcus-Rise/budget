import styled from "styled-components";
import { Icon } from "../icon";
import { Button, ButtonVariant } from "../button";

enum PopupType {
  SUCCESS = "success",
  DANGER = "danger",
  INFO = "info",
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonClose = styled(Button).attrs(() => ({
  variant: ButtonVariant.ICON,
  color: "inherit",
}))``;

type PopupProps = { type?: PopupType; onClose?: () => void; title?: string };

const Popup = styled.div.attrs<PopupProps, PopupProps>(({ onClose, type, title }) => {
  const iconName: string = type === PopupType.SUCCESS ? "success" : "info";

  return {
    type,
    children: (
      <Wrapper>
        <Content>
          <Icon name={iconName} />
          {title}
        </Content>
        <ButtonClose onClick={onClose}>
          <Icon name={"close"} size={"1.5rem"} />
        </ButtonClose>
      </Wrapper>
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

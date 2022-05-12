import styled, { css } from "styled-components";

enum ButtonVariant {
  TEXT = "text",
  ICON = "icon",
}

type ButtonProps = {
  variant?: ButtonVariant;
  color?: Color;
};

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 0.5rem;
  text-align: center;

  &:hover {
    opacity: 0.9;
    outline: none;
    cursor: pointer;
  }

  &:active {
    opacity: 0.7;
  }

  ${(props) => {
    const color = props.color ?? props.theme.primary;

    switch (props.variant) {
      case ButtonVariant.TEXT: {
        return css`
          padding: 0.75rem 1rem;
          color: ${color};
          background-color: transparent;

          &:hover {
            background-color: ${color};
            color: ${(props) => props.theme.lightest};
            opacity: 0.4;
          }
        `;
      }
      case ButtonVariant.ICON: {
        return css`
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          background-color: transparent;
          fill: ${color};
        `;
      }
      default: {
        return css`
          padding: 0.75rem 1rem;
          background-color: ${color};
          color: ${(props) => props.theme.lightest};
        `;
      }
    }
  }}
`;

export { Button, ButtonVariant };

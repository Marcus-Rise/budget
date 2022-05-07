import styled, { css } from "styled-components";

enum ButtonVariant {
  TEXT = "text",
}

type ButtonProps = {
  variant?: ButtonVariant;
  color?: Color;
};

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;

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
          color: ${color};
          background-color: transparent;

          &:hover {
            background-color: ${color};
            color: ${(props) => props.theme.lightest};
            opacity: 0.4;
          }
        `;
      }
      default: {
        return css`
          background-color: ${color};
          color: ${(props) => props.theme.lightest};
        `;
      }
    }
  }}
`;

export { Button, ButtonVariant };

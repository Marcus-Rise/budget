import styled, { css } from "styled-components";

const Card = styled.div.attrs<
  { shadow?: boolean },
  { shadow: boolean; hoverable?: boolean; width?: Width; maxWidth?: Width; height?: Height }
>((props) => {
  return {
    shadow: props.shadow ?? true,
  };
})`
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-wrap: break-word;
  width: 100%;

  ${(props) => css`
    background: ${props.theme.secondaryBackground};
  `}

  ${(props) => {
    if (!!props.hoverable) {
      return css`
        &:hover {
          cursor: pointer;
          box-shadow: 0 7px 20px ${props.theme.shadowDarkest};
        }
      `;
    }
  }}

  ${(props) => {
    if (!!props.shadow) {
      return css`
        box-shadow: 0 7px 20px ${props.theme.shadow};
      `;
    }
  }}

  ${(props) => {
    if (!!props.width) {
      return css`
        width: ${props.width};
      `;
    }
  }}

  ${(props) => {
    if (!!props.maxWidth) {
      return css`
        max-width: ${props.maxWidth};
      `;
    }
  }}

  ${(props) => {
    if (!!props.height) {
      return css`
        height: ${props.height};
      `;
    }
  }}
`;

export { Card };

import styled, { css } from "styled-components";
import { media } from "../../styles/grid";

const Container = styled.div<{ centered?: boolean }>`
  margin: 0 auto;

  ${media.md} {
    max-width: 80%;
  }

  ${(props) => {
    if (!!props.centered) {
      return css`
        display: flex;
        justify-content: center;
      `;
    }
  }}
`;

export { Container };

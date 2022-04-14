import styled, { css } from "styled-components";

const Container = styled.div<{ centered?: boolean }>`
  margin: 0 auto;

  max-width: 80%;

  /*@media (min-width: 1440px) {
    max-width: 60%;
  }*/

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

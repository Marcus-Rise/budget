import styled from "styled-components";

const Button = styled.button`
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  background-color: #eeeeee;
  border-color: black;

  &:hover {
    cursor: pointer;
    background-color: white;
  }

  &:active {
    background-color: #c2c2c2;
  }
`;

export { Button };

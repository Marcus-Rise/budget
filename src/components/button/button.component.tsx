import styled from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.lightest};

  &:hover,
  &:focus {
    opacity: 0.9;
    outline: none;
    cursor: pointer;
  }

  &:active {
    opacity: 0.7;
  }
`;

export { Button };

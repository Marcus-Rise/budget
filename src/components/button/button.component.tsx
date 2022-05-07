import styled from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: 1rem;
  padding: 0.7rem 1.25rem;
  font-weight: 500;
  font-size: 0.8rem;
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

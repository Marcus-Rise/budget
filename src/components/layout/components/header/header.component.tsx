import type { FC } from "react";
import { Container } from "../../../container";
import styled from "styled-components";

const StyledHeader = styled.header`
  position: sticky;
  z-index: 2;
  top: 0;
  left: 0;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.75);
  padding: 1rem;
  background-color: white;
`;

const Logo = styled.h1`
  font-size: 1.3rem;
  margin: 0;
`;

const Header: FC = () => {
  return (
    <StyledHeader>
      <Container>
        <Logo>Бюджет</Logo>
      </Container>
    </StyledHeader>
  );
};

export { Header };

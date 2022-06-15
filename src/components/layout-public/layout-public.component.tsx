import type { FC } from "react";
import styled from "styled-components";
import { Popup } from "../popup";
import { Link } from "../link";
import { Container } from "../container";

const Title = styled.h1`
  font-size: 2rem;
`;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Main = styled.main`
  position: relative;
`;

const LayoutPublic: FC = ({ children }) => {
  return (
    <Container>
      <Wrapper>
        <header>
          <Link href={"/"}>
            <Title>Бюджет</Title>
          </Link>
        </header>
        <Main>
          <Popup />
          {children}
        </Main>
      </Wrapper>
    </Container>
  );
};

export { LayoutPublic };

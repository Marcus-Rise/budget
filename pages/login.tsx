import type { NextPage } from "next";
import { AuthLoginForm } from "../src/auth/components/login-form";
import { Container } from "../src/components/container";
import styled from "styled-components";
import { Card } from "../src/components/card";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
`;

const LoginCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
`;

const Login: NextPage = () => {
  return (
    <Main>
      <Container>
        <LoginCard>
          <Title>Вход</Title>
          <AuthLoginForm onSubmit={console.debug} />
        </LoginCard>
      </Container>
    </Main>
  );
};

export default Login;

import type { NextPage } from "next";
import { AuthLoginForm } from "../../src/auth/components/login-form";
import { Container } from "../../src/components/container";
import styled from "styled-components";
import { Card } from "../../src/components/card";
import { useAuth } from "../../src/auth";
import type { IAuthLoginFormDto } from "../../src/auth/components/login-form/auth-login-form.dto";
import { PopupType, usePopup } from "../../src/components/popup";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const LoginCardTitle = styled.h2`
  font-size: 1.25rem;
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
  const { login } = useAuth();
  const popup = usePopup();

  const auth = (dto: IAuthLoginFormDto) => {
    login(dto).catch(() => {
      popup.open("Не удалось выполнить вход", PopupType.DANGER);
    });
  };

  return (
    <>
      <Main>
        <Title>Бюджет</Title>
        <Container>
          <LoginCard>
            <LoginCardTitle>Вход</LoginCardTitle>
            <AuthLoginForm onSubmit={auth} />
          </LoginCard>
        </Container>
      </Main>
    </>
  );
};

export default Login;

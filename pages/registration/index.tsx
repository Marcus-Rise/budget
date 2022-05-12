import type { NextPage } from "next";
import { Container } from "../../src/components/container";
import styled from "styled-components";
import { Card } from "../../src/components/card";
import { useAuth } from "../../src/auth";
import { PopupType, usePopup } from "../../src/components/popup";
import { useRouter } from "next/router";
import { Link } from "../../src/components/link";
import { Button, ButtonVariant } from "../../src/components/button";
import { AuthRegistrationForm } from "../../src/auth/components/registration-form/auth-registration-form.component";
import type { IAuthRegistrationFormDto } from "../../src/auth/components/registration-form/auth-registration-form.dto";

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

const FormCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
`;

const Registration: NextPage = () => {
  const router = useRouter();
  const { register } = useAuth();
  const popup = usePopup();

  const auth = (dto: IAuthRegistrationFormDto) =>
    register(dto)
      .then(() => router.push("/login"))
      .catch(() => popup.open("Не удалось зарегистрироваться", PopupType.DANGER));

  return (
    <>
      <Main>
        <Link href={"/"}>
          <Title>Бюджет</Title>
        </Link>
        <Container>
          <FormCard>
            <LoginCardTitle>Регистрация</LoginCardTitle>
            <AuthRegistrationForm onSubmit={auth} />
            <Button variant={ButtonVariant.TEXT} as={Link} href={"/login"}>
              Войти
            </Button>
          </FormCard>
        </Container>
      </Main>
    </>
  );
};

export default Registration;
import type { NextPage } from "next";
import styled from "styled-components";
import { Card } from "../../src/components/card";
import { useAuth } from "../../src/auth";
import { PopupType, usePopup } from "../../src/components/popup";
import { useRouter } from "next/router";
import { Link } from "../../src/components/link";
import { Button, ButtonVariant } from "../../src/components/button";
import { AuthRegistrationForm } from "../../src/auth/components/registration-form/auth-registration-form.component";
import type { IAuthRegistrationFormDto } from "../../src/auth/components/registration-form/auth-registration-form.dto";
import { useState } from "react";
import { LayoutPublic } from "../../src/components/layout-public";

const Title = styled.h2`
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
  const [loading, setLoading] = useState(false);

  const auth = (dto: IAuthRegistrationFormDto) => {
    setLoading(true);

    return register(dto)
      .then(() => {
        popup.open(
          "Вы успешно зарегистрировались! На Вашу почту придет письмо с инструкциями",
          PopupType.SUCCESS,
        );

        return router.push("/login");
      })
      .catch(() => popup.open("Не удалось зарегистрироваться", PopupType.DANGER))
      .finally(() => setLoading(false));
  };

  return (
    <LayoutPublic>
      <FormCard>
        <Title>Регистрация</Title>
        <AuthRegistrationForm onSubmit={auth} loading={loading} />
        <Button variant={ButtonVariant.TEXT} as={Link} href={"/login"}>
          Войти
        </Button>
      </FormCard>
    </LayoutPublic>
  );
};

export default Registration;

import type { NextPage } from "next";
import { AuthLoginForm } from "../../src/auth/components/login-form";
import styled from "styled-components";
import { Card } from "../../src/components/card";
import { useAuth } from "../../src/auth";
import type { IAuthLoginFormDto } from "../../src/auth/components/login-form/auth-login-form.dto";
import { PopupType, usePopup } from "../../src/components/popup";
import { useRouter } from "next/router";
import { useUser } from "../../src/user";
import { Button, ButtonVariant } from "../../src/components/button";
import { Link } from "../../src/components/link";
import { useState } from "react";
import { LayoutPublic } from "../../src/components/layout-public";

const FormCardTitle = styled.h2`
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

const Login: NextPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const popup = usePopup();
  const user = useUser();
  const [loading, setLoading] = useState(false);

  const auth = (dto: IAuthLoginFormDto) => {
    setLoading(true);

    return login(dto)
      .then(async () => {
        await user.updateUser();

        return router.push("/");
      })
      .catch(() => popup.open("Не удалось выполнить вход", PopupType.DANGER))
      .finally(() => setLoading(false));
  };

  return (
    <LayoutPublic>
      <FormCard>
        <FormCardTitle>Вход</FormCardTitle>
        <AuthLoginForm onSubmit={auth} loading={loading} />
        <Button variant={ButtonVariant.TEXT} as={Link} href={"/registration"}>
          Зарегистрироваться
        </Button>
      </FormCard>
    </LayoutPublic>
  );
};

export default Login;

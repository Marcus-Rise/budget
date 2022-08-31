import type { NextPage } from "next";
import { AuthLoginForm } from "../src/auth/components/login-form";
import styled from "styled-components";
import { Card } from "../src/components/card";
import { useAuth } from "../src/auth";
import type { IAuthLoginFormDto } from "../src/auth/components/login-form/auth-login-form.dto";
import { PopupType, usePopup } from "../src/components/popup";
import { useRouter } from "next/router";
import { Button, ButtonVariant } from "../src/components/button";
import { Link } from "../src/components/link";
import type { FC } from "react";
import { useState } from "react";
import { LayoutPublic } from "../src/components/layout-public";
import type { IUserService } from "../src/user";
import { USER_SERVICE } from "../src/user";
import { useContainer } from "../src/ioc";
import { observer } from "mobx-react-lite";

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

const Login: NextPage<{ userService: IUserService }> = ({ userService }) => {
  const router = useRouter();
  const { login } = useAuth();
  const popup = usePopup();
  const [loading, setLoading] = useState(false);

  const auth = (dto: IAuthLoginFormDto) => {
    setLoading(true);

    return login(dto)
      .then(async () => {
        await userService.loadCurrentUser();

        return router.push("/?uploadData=true");
      })
      .catch(() => {
        popup.open("Не удалось выполнить вход", PopupType.DANGER);

        setLoading(false);
      });
  };

  return (
    <LayoutPublic>
      <FormCard>
        <FormCardTitle>Вход</FormCardTitle>
        <AuthLoginForm onSubmit={auth} loading={loading} />
        <Button variant={ButtonVariant.TEXT} as={Link} href={"/registration"}>
          Зарегистрироваться
        </Button>
        <Button variant={ButtonVariant.TEXT} as={Link} href={"/forgot-password"}>
          Сбросить пароль
        </Button>
      </FormCard>
    </LayoutPublic>
  );
};

const ObservableLogin = observer(Login);
const InjectedLogin: FC = ({ children }) => {
  const userService = useContainer<IUserService>(USER_SERVICE);

  if (!userService) {
    return null;
  }

  return <ObservableLogin userService={userService}>{children}</ObservableLogin>;
};

export default InjectedLogin;
export { ObservableLogin as Login };

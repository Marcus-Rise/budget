import type { NextPage } from "next";
import { LayoutPublic } from "../src/components/layout-public";
import styled from "styled-components";
import { Card } from "../src/components/card";
import { useState } from "react";
import { useAuth } from "../src/auth";
import { PopupType, usePopup } from "../src/components/popup";
import type { ChangePasswordFormDto } from "../src/auth/components/change-password-form";
import { ChangePasswordForm } from "../src/auth/components/change-password-form";
import { Button, ButtonVariant } from "../src/components/button";
import { Link } from "../src/components/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

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

const ChangePassword: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const popup = usePopup();
  const router = useRouter();
  const formMethods = useForm();

  const changePassword = (dto: ChangePasswordFormDto) => {
    setLoading(true);

    return auth
      .changePasswordFromEmail(dto)
      .then(() => {
        popup.open("Ваш пароль изменен!", PopupType.SUCCESS);

        formMethods.reset();

        return router.push("/login");
      })
      .catch(() => {
        popup.open("Не удалось изменить пароль", PopupType.DANGER);

        setLoading(false);
      });
  };

  return (
    <LayoutPublic>
      <FormCard>
        <Title>Смена пароля</Title>
        <FormProvider {...formMethods}>
          <ChangePasswordForm onSubmit={changePassword} loading={loading} />
        </FormProvider>
        <Button variant={ButtonVariant.TEXT} as={Link} href={"/login"}>
          Войти
        </Button>
      </FormCard>
    </LayoutPublic>
  );
};

export default ChangePassword;

import { LayoutPublic } from "../src/components/layout-public";
import styled from "styled-components";
import { Card } from "../src/components/card";
import type { ForgotPasswordFormDto } from "../src/auth/components/forgot-password-form";
import { ForgotPasswordForm } from "../src/auth/components/forgot-password-form";
import { useState } from "react";
import { useAuth } from "../src/auth";
import { PopupType, usePopup } from "../src/components/popup";

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

const ForgotPassword: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const popup = usePopup();

  const resetPassword = (dto: ForgotPasswordFormDto) => {
    setLoading(true);

    return auth
      .resetPassword(dto)
      .then(() => {
        popup.open(
          "Если Вы зарегистрированы, то на Вашу почту придет письмо с инструкциями",
          PopupType.INFO,
        );
      })
      .catch(() => popup.open("Не удалось сбросить пароль", PopupType.DANGER))
      .finally(() => setLoading(false));
  };

  return (
    <FormCard>
      <Title>Сброс пароля</Title>
      <ForgotPasswordForm onSubmit={resetPassword} loading={loading} />
    </FormCard>
  );
};

ForgotPassword.getLayout = (page) => <LayoutPublic>{page}</LayoutPublic>;

export default ForgotPassword;

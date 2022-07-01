import type { NextPage } from "next";
import { LayoutPrivate } from "../src/components/layout-private";
import { useUser } from "../src/user";
import { Card } from "../src/components/card";
import { Container } from "../src/components/container";
import { Button, ButtonVariant } from "../src/components/button";
import { useRouter } from "next/router";
import styled, { useTheme } from "styled-components";
import { useAuth } from "../src/auth";
import type { ChangePasswordFormProps } from "../src/auth/components/change-password-form";
import { ChangePasswordForm } from "../src/auth/components/change-password-form";
import { useState } from "react";
import { PopupType, usePopup } from "../src/components/popup";

const ProfileContainer = styled(Container)`
  padding-top: 1rem;
  display: flex;
  align-items: center;
`;

const ProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
`;

const ChangePasswordFormTitle = styled.h3`
  font-size: 1rem;
`;

const ChangePasswordFormWrapper = styled.div`
  max-width: 20rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Profile: NextPage = () => {
  const { user, isLoading, updateUser, deleteUser } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const popup = usePopup();

  const logout = async () => {
    await auth.logout();

    await updateUser();

    return router.push("/");
  };

  const deleteAccount = async () => {
    const agree = confirm("Вы действительно хотите удалить свой аккаунт?");

    if (agree) {
      await deleteUser();

      await auth.logout();

      return router.push("/");
    }
  };

  const changePassword: ChangePasswordFormProps["onSubmit"] = (dto) => {
    setChangePasswordLoading(true);

    return auth
      .changePassword(dto)
      .then(() => popup.open("Ваш пароль изменен!", PopupType.SUCCESS))
      .catch(() => popup.open("Не удалось изменить пароль", PopupType.DANGER))
      .finally(() => setChangePasswordLoading(false));
  };

  return (
    <LayoutPrivate>
      <ProfileContainer>
        <ProfileCard>
          <Title>Профиль</Title>
          {!user || isLoading ? (
            "Loading..."
          ) : (
            <>
              Логин: {user.login}
              <ChangePasswordFormWrapper>
                <ChangePasswordFormTitle>Смена пароля</ChangePasswordFormTitle>
                <ChangePasswordForm onSubmit={changePassword} loading={changePasswordLoading} />
              </ChangePasswordFormWrapper>
              <ActionsContainer>
                <Button onClick={logout}>Выйти</Button>
                <Button variant={ButtonVariant.TEXT} color={theme.danger} onClick={deleteAccount}>
                  Удалить аккаунт
                </Button>
              </ActionsContainer>
            </>
          )}
        </ProfileCard>
      </ProfileContainer>
    </LayoutPrivate>
  );
};

export default Profile;

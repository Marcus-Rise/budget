import { LayoutPrivate } from "../src/components/layout-private";
import { Card } from "../src/components/card";
import { Container } from "../src/components/container";
import { Button, ButtonVariant } from "../src/components/button";
import { useRouter } from "next/router";
import styled, { useTheme } from "styled-components";
import { useAuth } from "../src/auth";
import type { ChangePasswordFormProps } from "../src/auth/components/change-password-form";
import { ChangePasswordForm } from "../src/auth/components/change-password-form";
import type { FC } from "react";
import { useState } from "react";
import { PopupType, usePopup } from "../src/components/popup";
import { FormProvider, useForm } from "react-hook-form";
import type { IUserService, IUserStore } from "../src/user";
import { USER_SERVICE, USER_STORE } from "../src/user";
import { useInjection } from "../src/ioc";
import { observer } from "mobx-react-lite";

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

const Profile: NextPageWithLayout<{ userStore: IUserStore; userService: IUserService }> = ({
  userStore,
  userService,
}) => {
  const auth = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const popup = usePopup();
  const changePasswordMethods = useForm();

  const logout = async () => {
    await auth.logout();

    await userService.loadCurrentUser();

    return router.push("/");
  };

  const deleteAccount = async () => {
    const agree = confirm("Вы действительно хотите удалить свой аккаунт?");

    if (agree) {
      await userService.deleteAccount();

      await auth.logout();

      return router.push("/");
    }
  };

  const changePassword: ChangePasswordFormProps["onSubmit"] = (dto) => {
    setChangePasswordLoading(true);

    return auth
      .changePassword(dto)
      .then(() => {
        popup.open("Ваш пароль изменен!", PopupType.SUCCESS);

        changePasswordMethods.reset();
      })
      .catch(() => popup.open("Не удалось изменить пароль", PopupType.DANGER))
      .finally(() => setChangePasswordLoading(false));
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <Title>Профиль</Title>
        {!userStore.user || userStore.isLoading ? (
          "Loading..."
        ) : (
          <>
            Логин: {userStore.user.login}
            <ChangePasswordFormWrapper>
              <ChangePasswordFormTitle>Смена пароля</ChangePasswordFormTitle>
              <FormProvider {...changePasswordMethods}>
                <ChangePasswordForm onSubmit={changePassword} loading={changePasswordLoading} />
              </FormProvider>
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
  );
};

Profile.getLayout = (page) => <LayoutPrivate>{page}</LayoutPrivate>;

const ObservableProfile = observer(Profile);
const InjectedProfile: FC = ({ children }) => (
  <ObservableProfile userStore={useInjection(USER_STORE)} userService={useInjection(USER_SERVICE)}>
    {children}
  </ObservableProfile>
);

export default InjectedProfile;
export { ObservableProfile as Profile };

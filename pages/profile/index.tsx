import type { NextPage } from "next";
import { Layout } from "../../src/components/layout";
import { useUser } from "../../src/user";
import { Card } from "../../src/components/card";
import { Container } from "../../src/components/container";
import { Button, ButtonVariant } from "../../src/components/button";
import { useRouter } from "next/router";
import styled, { useTheme } from "styled-components";
import { useAuth } from "../../src/auth";

const ProfileContainer = styled(Container)`
  padding-top: 1rem;
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
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

  return (
    <Layout>
      <ProfileContainer>
        <Card>
          <Title>Профиль</Title>
          {!user || isLoading ? (
            "Loading..."
          ) : (
            <>
              Email: {user.email}
              <br />
              <br />
              <ActionsContainer>
                <Button onClick={logout}>Выйти</Button>
                <Button variant={ButtonVariant.TEXT} color={theme.danger} onClick={deleteAccount}>
                  Удалить аккаунт
                </Button>
              </ActionsContainer>
            </>
          )}
        </Card>
      </ProfileContainer>
    </Layout>
  );
};

export default Profile;

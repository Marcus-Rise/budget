import type { NextPage } from "next";
import { Layout } from "../../src/components/layout";
import { useUser } from "../../src/user";
import { Card } from "../../src/components/card";
import { Container } from "../../src/components/container";
import { Button } from "../../src/components/button";
import { useRouter } from "next/router";
import styled from "styled-components";

const ProfileContainer = styled(Container)`
  padding-top: 1rem;
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
`;

const Profile: NextPage = () => {
  const { user, isLoading, updateUser } = useUser();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout");

    await updateUser();

    return router.push("/");
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
              <Button onClick={logout}>Выйти</Button>
            </>
          )}
        </Card>
      </ProfileContainer>
    </Layout>
  );
};

export default Profile;

import type { NextPage } from "next";
import { Layout } from "../../src/components/layout";
import { useUser } from "../../src/user";
import { Card } from "../../src/components/card";
import { Container } from "../../src/components/container";
import { Button } from "../../src/components/button";
import { useRouter } from "next/router";

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
      <Container>
        <Card>
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
      </Container>
    </Layout>
  );
};

export default Profile;

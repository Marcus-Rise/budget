import type { NextPage } from "next";
import { LayoutPublic } from "../../src/components/layout-public";
import styled, { useTheme } from "styled-components";
import { Card } from "../../src/components/card";
import { Icon } from "../../src/components/icon";
import { Link } from "../../src/components/link";
import { Button } from "../../src/components/button";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  margin: 0;
`;

const RegistrationConfirm: NextPage = () => {
  const theme = useTheme();

  return (
    <LayoutPublic>
      <StyledCard>
        <Title>Ваш аккаунт подтвержден!</Title>{" "}
        <Icon name={"success"} color={theme.success} size={"3rem"} />
        <Button href={"/login"} as={Link}>
          Войти
        </Button>
      </StyledCard>
    </LayoutPublic>
  );
};

export default RegistrationConfirm;

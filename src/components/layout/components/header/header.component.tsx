import type { FC } from "react";
import { Container } from "../../../container";
import styled from "styled-components";
import { UserProfile } from "../../../../user/components/profile";
import { Link } from "../../../link";
import { useUser } from "../../../../user";

const StyledHeader = styled.header`
  position: sticky;
  z-index: 2;
  top: 0;
  left: 0;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.75);
  padding: 1rem;
  background-color: white;
`;

const Logo = styled.h1`
  font-size: 1.3rem;
  margin: 0;
`;

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const Header: FC = () => {
  const { user } = useUser();

  return (
    <StyledHeader>
      <HeaderContainer>
        <Logo>Бюджет</Logo>
        <Link href={!user ? "/login" : "/profile"}>
          <UserProfile email={user?.email} />
        </Link>
      </HeaderContainer>
    </StyledHeader>
  );
};

export { Header };

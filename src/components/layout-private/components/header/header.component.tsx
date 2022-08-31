import type { FC } from "react";
import { Container } from "../../../container";
import styled from "styled-components";
import { UserProfile } from "../../../../user/components/profile";
import { Link } from "../../../link";
import { media } from "../../../../../styles/grid";
import type { IUserStore } from "../../../../user";
import { USER_STORE } from "../../../../user";
import { useContainer } from "../../../../ioc";
import { observer } from "mobx-react-lite";

const StyledHeader = styled.header`
  position: sticky;
  z-index: 2;
  top: 0;
  left: 0;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.75);
  padding: 1rem;
  background-color: white;

  ${media.md} {
    padding: 1rem 0;
  }
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

const Header: FC<{ userStore: IUserStore }> = ({ userStore }) => {
  const userProfileLabel = userStore.isLoading ? "Загрузка..." : userStore.user?.login ?? "Войти";
  const userProfileLink = !userStore.user ? "/login" : "/profile";

  return (
    <StyledHeader>
      <HeaderContainer>
        <Link href={"/"}>
          <Logo>Бюджет</Logo>
        </Link>
        <Link href={userProfileLink}>
          <UserProfile label={userProfileLabel} />
        </Link>
      </HeaderContainer>
    </StyledHeader>
  );
};

const ObservableHeader = observer(Header);
const InjectedHeader: FC = ({ children }) => {
  const userStore = useContainer<IUserStore>(USER_STORE);

  if (!userStore) {
    return null;
  }

  return <ObservableHeader userStore={userStore}>{children}</ObservableHeader>;
};

export { ObservableHeader as Header, InjectedHeader };

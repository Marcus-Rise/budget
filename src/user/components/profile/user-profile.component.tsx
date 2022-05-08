import { Icon } from "../../../components/icon";
import styled, { useTheme } from "styled-components";

const UserProfile = styled.div.attrs(() => {
  const theme = useTheme();

  return {
    children: (
      <>
        <Icon name={"account"} color={theme.primary} /> <span>Войти</span>
      </>
    ),
  };
})`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.7;
  }
`;

export { UserProfile };

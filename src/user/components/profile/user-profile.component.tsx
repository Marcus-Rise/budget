import { Icon } from "../../../components/icon";
import styled, { useTheme } from "styled-components";
import type { ReactElement } from "react";

const UserProfile = styled.div.attrs<
  { email?: string },
  { email?: string; children?: ReactElement }
>((props) => {
  const theme = useTheme();

  return {
    children: (
      <>
        <Icon name={"account"} color={theme.primary} /> <span>{props.email ?? "Войти"}</span>
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

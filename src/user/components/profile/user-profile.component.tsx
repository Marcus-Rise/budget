import { Icon } from "../../../components/icon";
import styled, { useTheme } from "styled-components";
import type { FC } from "react";

const Profile = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.7;
  }
`;

const UserProfile: FC<{ label: string }> = ({ label }) => {
  const theme = useTheme();

  return (
    <Profile>
      <Icon name={"account"} color={theme.primary} /> <span>{label}</span>
    </Profile>
  );
};

export { UserProfile };

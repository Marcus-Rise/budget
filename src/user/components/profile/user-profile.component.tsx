import { Icon } from "../../../components/icon";
import styled from "styled-components";

const UserProfile = styled.div.attrs(() => {
  return {
    children: (
      <>
        <Icon name={"account"} /> <span>Войти</span>
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

import { Icon } from "../../../components/icon";
import styled from "styled-components";

const Label = styled.span`
  color: ${(props) => props.theme.lightest};
`;

const UserProfile = styled.div.attrs((props) => {
  return {
    children: (
      <>
        <Icon name={"account"} /> <Label>Profile</Label>
      </>
    ),
  };
})`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.5rem 1rem 0.5rem 0.6rem;
  border-radius: 1rem;

  background-color: ${(props) => props.theme.primaryLighter};

  &:hover {
    opacity: 0.7;
  }
`;

export { UserProfile };

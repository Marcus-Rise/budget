import type { FC } from "react";
import styled from "styled-components";

const Root = styled.div`
  padding: 1rem 0;
`;

const Title = styled.span`
  display: block;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

type TitledListProps = { title: string };

const TitledList: FC<TitledListProps> = ({ title, children }) => (
  <Root>
    <Title>{title}</Title>
    <List>{children}</List>
  </Root>
);

export { TitledList };

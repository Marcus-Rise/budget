import type { FC, ReactElement } from "react";
import styled from "styled-components";

const Root = styled.div`
  padding: 1rem 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.span`
  display: block;
  font-weight: bold;
  font-size: 1rem;
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

type TitledListProps = { title: string; meta?: ReactElement };

const TitledList: FC<TitledListProps> = ({ title, meta, children }) => (
  <Root>
    <Header>
      <Title>{title}</Title>
      {meta}
    </Header>
    <List>{children}</List>
  </Root>
);

export { TitledList };

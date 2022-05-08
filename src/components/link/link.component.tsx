import type { ComponentProps, FC } from "react";
import NextLink from "next/link";
import styled from "styled-components";

const LinkStyled = styled.a`
  &:hover,
  &:focus {
    display: block;
    cursor: pointer;
  }
`;

type LinkProps = ComponentProps<typeof NextLink> & {
  target?: string;
};

const Link: FC<LinkProps> = ({ children, target, ...props }) => (
  <NextLink {...props} passHref>
    <LinkStyled target={target}>{children}</LinkStyled>
  </NextLink>
);

export { Link };
export type { LinkProps };

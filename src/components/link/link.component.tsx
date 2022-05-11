import type { ComponentProps } from "react";
import { forwardRef } from "react";
import NextLink from "next/link";
import styled from "styled-components";

const LinkStyled = styled.a`
  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

type LinkProps = Omit<ComponentProps<typeof NextLink>, "as"> & {
  target?: string;
  className?: string;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, target, ...props }, ref) => (
    <NextLink {...props} passHref>
      <LinkStyled ref={ref} className={className} target={target}>
        {children}
      </LinkStyled>
    </NextLink>
  ),
);

export { Link };
export type { LinkProps };

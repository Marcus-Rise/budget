import styled, { css, keyframes } from "styled-components";
import type { FC } from "react";

const LoaderWrapper = styled.div<{ size?: Size }>`
  display: inline-block;
  position: relative;

  ${(props) => {
    const size = props.size ?? "5rem";

    return css`
      width: ${size};
      height: ${size};
    `;
  }};
`;

const LoaderRotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderBlock = styled.div<{ color?: Color; size?: Size; width?: Width }>`
  box-sizing: border-box;
  display: block;
  position: absolute;

  ${(props) => {
    const size = props.size ?? "4rem";

    return css`
      width: ${size};
      height: ${size};
    `;
  }};

  border: ${(props) => props.width ?? "0.5rem"} solid
    ${(props) => props.color ?? props.theme.darkest};
  border-radius: 50%;
  animation: ${LoaderRotateAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${(props) => props.color ?? props.theme.darkest} transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Loader: FC<{ color?: Color; size?: Size; width?: Width }> = ({ color, size, width }) => (
  <LoaderWrapper size={size}>
    <LoaderBlock color={color} width={width} size={size} />
    <LoaderBlock color={color} width={width} size={size} />
    <LoaderBlock color={color} width={width} size={size} />
    <LoaderBlock color={color} width={width} size={size} />
  </LoaderWrapper>
);

export { Loader };

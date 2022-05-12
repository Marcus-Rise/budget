import React from "react";
import styled, { css } from "styled-components";

const Icon = styled.svg.attrs<
  { hoverable?: boolean; size?: string; color?: string },
  { size?: string; hoverable?: boolean }
>((props) => {
  const size = props.size ?? "2rem";

  return {
    width: size,
    height: size,
    size,
    fill: props.color,
    className: `icon icon-${props.name}${props.className}`,
    children: <use href={`/sprite.svg#${props.name}`} />,
  };
})`
  ${(props) => {
    if (props.hoverable) {
      return css`
        &:hover {
          cursor: pointer;
        }
      `;
    }
  }}
`;

export { Icon };

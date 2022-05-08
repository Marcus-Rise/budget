import React from "react";
import styled from "styled-components";

const Icon = styled.svg.attrs<{ size?: string; color?: string }, { size?: string }>((props) => {
  const size = props.size ?? "2rem";

  return {
    width: size,
    height: size,
    size,
    fill: props.color,
    className: `icon icon-${props.name}${props.className}`,
    children: <use href={`/sprite.svg#${props.name}`} />,
  };
})``;

export { Icon };

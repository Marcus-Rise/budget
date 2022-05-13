import type { FC } from "react";
import styled, { css, useTheme } from "styled-components";

/**
 * @example
 * 80
 * 20
 * 1
 */
type Percent = number;

const DataContainer = styled.div<{ height?: number }>`
  min-width: 3rem;
  width: 100%;
  height: ${(props) => props.height ?? 1}rem;
  display: flex;
`;
const DataItem = styled.span<{ color: Color; width: number }>`
  background-color: ${(props) => props.color};
  height: 100%;
  width: ${(props) => props.width}%;

  ${() => {
    const borderRadius = "0.25rem";

    return css`
      &:first-child {
        border-bottom-left-radius: ${borderRadius};
        border-top-left-radius: ${borderRadius};
      }

      &:last-child {
        border-bottom-right-radius: ${borderRadius};
        border-top-right-radius: ${borderRadius};
      }
    `;
  }}
`;

type ChartSlimProps = {
  credit: Percent;
  profit: Percent;
  height?: number;
};

const ChartSlim: FC<ChartSlimProps> = ({ profit, credit, height }) => {
  const theme = useTheme();

  return (
    <DataContainer height={height}>
      <DataItem color={theme.danger} width={credit} />
      <DataItem color={theme.success} width={profit} />
    </DataContainer>
  );
};

export { ChartSlim };

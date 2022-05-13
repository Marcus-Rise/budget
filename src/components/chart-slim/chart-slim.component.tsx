import type { FC } from "react";
import { useMemo } from "react";
import styled from "styled-components";
import { generateColor } from "../../helpers/generate-chart-color-array";
import { aggregateChartData } from "../../helpers/aggregate-chart-data";

type ChartSlimDataItem = { title: string; value: number };
type ChartSlimData = Array<ChartSlimDataItem>;

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
`;

type ChartSlimProps = {
  height?: number;
  data: ChartSlimData;
  colors?: Color[];
};

const ChartSlim: FC<ChartSlimProps> = ({ data, height, colors = [] }) => {
  const items = useMemo(() => {
    const groupedData = aggregateChartData(data);
    const totalValue = groupedData.reduce((accum, item) => accum + item.value, 0);

    return groupedData.map((item, index) => {
      const color = colors[index] ?? generateColor();
      const percents = (item.value / totalValue) * 100;

      return <DataItem key={item.title} color={color} width={percents} />;
    });
  }, [data, colors]);

  return <DataContainer height={height}>{items}</DataContainer>;
};

export { ChartSlim };

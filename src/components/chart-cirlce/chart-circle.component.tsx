import type { ComponentProps, FC } from "react";
import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { generateArrayOfColors } from "./chart-circle.helper";

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartCircleDataItem = { title: string; value: number };
type ChartCircleData = Array<ChartCircleDataItem>;

/**
 *
 * @return unique array of items with sum
 */
const aggregateData = (data: ChartCircleData): ChartCircleData => {
  const groups = Array.from(new Set(data.map((i) => i.title)));

  return groups.map((groupTitle) => {
    const sum = data.reduce((sum, group) => {
      return group.title === groupTitle ? sum + group.value : sum;
    }, 0);

    return {
      title: groupTitle,
      value: sum,
    };
  });
};

type ChartCircleProps = {
  data: ChartCircleData;
  title?: string;
  borderWidth?: number;
};

type Data = ComponentProps<typeof Doughnut>["data"];

const ChartCircle: FC<ChartCircleProps> = ({ data, title, borderWidth = 2 }) => {
  const pieData: Data = useMemo(() => {
    const groupedData = aggregateData(data);
    const labels = groupedData.map((i) => i.title);
    const colors = generateArrayOfColors(labels.length);

    return {
      labels,
      datasets: [
        {
          label: title,
          data: groupedData.map((i) => i.value),
          backgroundColor: colors,
          borderColor: "#575757",
          borderWidth,
        },
      ],
    };
  }, [borderWidth, data, title]);

  return <Doughnut data={pieData} />;
};

export { ChartCircle };
export type { ChartCircleData };

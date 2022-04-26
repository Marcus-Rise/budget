import type { ComponentProps, FC } from "react";
import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { generateArrayOfColors } from "./chart-pie.helper";

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartPieDataItem = { title: string; value: number };
type ChartPieData = Array<ChartPieDataItem>;

/**
 *
 * @return unique array of items with sum
 */
const aggregateData = (data: ChartPieData): ChartPieData => {
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

type ChartPieProps = {
  data: ChartPieData;
  title?: string;
  borderWidth?: number;
};

type Data = ComponentProps<typeof Pie>["data"];

const ChartPie: FC<ChartPieProps> = ({ data, title, borderWidth = 2 }) => {
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

  return <Pie data={pieData} />;
};

export { ChartPie };
export type { ChartPieData };

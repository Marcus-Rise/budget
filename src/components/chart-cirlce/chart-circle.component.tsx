import type { ComponentProps, FC } from "react";
import React, { useMemo } from "react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { aggregateChartData } from "../../helpers/aggregate-chart-data";
import { generateChartColorArray } from "../../helpers/generate-chart-color-array";

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartCircleDataItem = { title: string; value: number };
type ChartCircleData = Array<ChartCircleDataItem>;

type ChartCircleProps = {
  data: ChartCircleData;
  title?: string;
  borderWidth?: number;
};

type Data = ComponentProps<typeof Doughnut>["data"];

const ChartCircle: FC<ChartCircleProps> = ({ data, title, borderWidth = 2 }) => {
  const pieData: Data = useMemo(() => {
    const groupedData = aggregateChartData(data);
    const labels = groupedData.map((i) => i.title);
    const colors = generateChartColorArray(labels.length);

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

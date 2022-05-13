type ChartDataItem = { title: string; value: number };
type ChartData = Array<ChartDataItem>;

/**
 *
 * @return unique array of items with sum
 */
const aggregateChartData = (data: ChartData): ChartData => {
  const groups = Array.from(new Set(data.map((i) => i.title)));

  return groups.map((groupTitle) => {
    const sum = data.reduce(
      (sum, group) => (group.title === groupTitle ? sum + group.value : sum),
      0,
    );

    return {
      title: groupTitle,
      value: sum,
    };
  });
};

export { aggregateChartData };

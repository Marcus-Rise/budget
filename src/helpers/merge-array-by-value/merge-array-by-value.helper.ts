const mergeArrayByValueHelper = <T extends { title: string; value: unknown }>(
  newArr: Array<T>,
): Array<T> => {
  const uniqueValueGroups = Array.from(new Set(newArr.map((i) => i.value)));

  return uniqueValueGroups.map((group) => {
    const [newValue] = newArr.filter((i) => i.value === group);

    return newValue;
  });
};

export { mergeArrayByValueHelper };

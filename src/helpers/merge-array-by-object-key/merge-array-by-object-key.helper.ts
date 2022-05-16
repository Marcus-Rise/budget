const mergeArrayByObjectKeyHelper = <T extends Record<string, unknown>>(
  arr: Array<T>,
  key: keyof T,
): Array<T> => {
  const uniqueValueGroups = Array.from(new Set(arr.map((i) => i[key])));

  return uniqueValueGroups.map((group) => {
    const [newValue] = arr.filter((i) => i[key] === group);

    return newValue;
  });
};

export { mergeArrayByObjectKeyHelper };

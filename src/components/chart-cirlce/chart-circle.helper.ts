const generateColor = (): Color => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

const generateArrayOfColors = (length: number): Array<Color> => {
  const arr: Color[] = [];

  for (let i = 0; i < length; i++) {
    arr.push(generateColor());
  }

  return arr;
};

export { generateArrayOfColors, generateColor };

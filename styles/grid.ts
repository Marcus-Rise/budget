import { screenSizes } from "./variables";

const mediaMinQuery = (width: number) => `@media (min-width: ${width}px)`;

const media = {
  md: mediaMinQuery(screenSizes.md),
};

export { media };

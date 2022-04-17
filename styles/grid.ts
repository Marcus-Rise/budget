import { screenSizes } from "./variables";

const mediaMaxQuery = (width: number) => `@media (max-width: ${width}px)`;
const mediaMinQuery = (width: number) => `@media (min-width: ${width}px)`;

const media = {
  sm: mediaMaxQuery(screenSizes.md - 1),
  md: mediaMinQuery(screenSizes.md),
};

export { media };

import { useContext } from "react";
import { ContainerContext } from "./container.context";
import type { Container } from "inversify";

const useInjection = <T>(identifier: symbol): T => {
  const { container } = useContext(ContainerContext);

  if (!container) {
    throw new Error("no container");
  }

  return container.get<T>(identifier);
};

const useContainer = (): Container => {
  const { container } = useContext(ContainerContext);

  if (!container) {
    throw new Error("no container");
  }

  return container;
};

export { useInjection, useContainer };

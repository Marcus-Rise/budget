import { useContext } from "react";
import { ContainerContext } from "./container.context";

const useInjection = <T>(identifier: symbol): T => {
  const { container } = useContext(ContainerContext);

  if (!container) {
    throw new Error("no container");
  }

  return container.get<T>(identifier);
};

export { useInjection };

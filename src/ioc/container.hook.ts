import { useContext, useRef } from "react";
import { ContainerContext } from "./container.context";

const useContainer = <T>(identifier: symbol) => {
  const ref = useRef<T | null>(null);
  const { container } = useContext(ContainerContext);

  if (!container) {
    throw new Error("no container");
  }

  if (container.isBound(identifier)) {
    ref.current = container.get<T>(identifier);
  } else {
    container.getAsync<T>(identifier).then((module) => {
      ref.current = module;
    });
  }

  return ref.current;
};

export { useContainer };

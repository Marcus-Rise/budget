import type { FC } from "react";
import { useEffect, useState } from "react";
import { interfaces } from "inversify";
import { useContainer } from "./container.hook";
import AsyncContainerModule = interfaces.AsyncContainerModule;

const ContainerModuleLoader: FC<{ modules: AsyncContainerModule[] }> = ({ modules, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const container = useContainer();

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      setIsLoading(true);

      container
        .loadAsync(...modules)
        .then(() => setIsLoaded(true))
        .finally(() => setIsLoading(false));
    }
  }, [container, isLoaded, isLoading, modules]);

  if (!isLoaded) {
    return null;
  }

  return <>{children}</>;
};

export { ContainerModuleLoader };

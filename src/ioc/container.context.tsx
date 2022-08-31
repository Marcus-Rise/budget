import type { FC } from "react";
import { createContext } from "react";
import type { Container } from "inversify";

type ContainerState = { container: Container | null };

const ContainerContext = createContext<ContainerState>({ container: null });

const ContainerProvider: FC<ContainerState> = ({ container, children }) => (
  <ContainerContext.Provider value={{ container }}>{children}</ContainerContext.Provider>
);

export { ContainerProvider, ContainerContext };

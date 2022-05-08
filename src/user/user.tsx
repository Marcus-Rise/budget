import type { FC, PropsWithChildren } from "react";
import { createContext, useContext } from "react";

interface IUser {
  email: string;
}

type UserContextData = { user?: IUser };
const UserContext = createContext<UserContextData>({});

const UserProvider: FC<PropsWithChildren<UserContextData>> = ({ children, ...props }) => (
  <UserContext.Provider value={props}>{children}</UserContext.Provider>
);

const useUser = (): { user?: IUser } => {
  const { user } = useContext(UserContext);

  return { user };
};

export { UserProvider, useUser };
export type { IUser };

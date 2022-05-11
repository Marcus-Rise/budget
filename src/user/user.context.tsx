import type { Dispatch, FC, PropsWithChildren } from "react";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import type { UserReducerActions, UserReducerState } from "./user.reducer";
import { userReducer, UserReducerActionsEnum, userReducerInitialState } from "./user.reducer";
import { getUser } from "./user.service";

const UserContext = createContext<{
  state: UserReducerState;
  dispatch: Dispatch<UserReducerActions>;
}>({
  state: userReducerInitialState,
  dispatch: () => null,
});

const UserProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userReducerInitialState);
  const [isInitialized, setIsInitialized] = useState(false);
  const shouldInitialize = useMemo(
    () => !isInitialized && !state.isLoading,
    [isInitialized, state.isLoading],
  );

  useEffect(() => {
    if (shouldInitialize) {
      dispatch({ type: UserReducerActionsEnum.SET_LOADING, payload: true });

      getUser()
        .then((user) => {
          dispatch({ type: UserReducerActionsEnum.SET_USER, payload: user });
        })
        .catch(console.error)
        .finally(() => {
          dispatch({ type: UserReducerActionsEnum.SET_LOADING, payload: false });
          setIsInitialized(true);
        });
    }
  }, [shouldInitialize]);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };

import { useContext } from "react";
import { UserContext } from "./user.context";
import { getUser } from "./user.service";
import { UserReducerActionsEnum } from "./user.reducer";

const useUser = () => {
  const { state, dispatch } = useContext(UserContext);

  const updateUser = () => {
    dispatch({ type: UserReducerActionsEnum.SET_LOADING, payload: true });

    return getUser()
      .then((user) => {
        dispatch({ type: UserReducerActionsEnum.SET_USER, payload: user });
      })
      .catch(() => {
        dispatch({ type: UserReducerActionsEnum.SET_USER, payload: null });
      })
      .finally(() => {
        dispatch({ type: UserReducerActionsEnum.SET_LOADING, payload: false });
      });
  };

  return { ...state, updateUser };
};

export { useUser };

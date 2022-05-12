import { useContext } from "react";
import { UserContext } from "./user.context";
import { UserService } from "./user.service";
import { UserReducerActionsEnum } from "./user.reducer";

const useUser = () => {
  const { state, dispatch } = useContext(UserContext);

  const updateUser = () => {
    dispatch({ type: UserReducerActionsEnum.SET_LOADING, payload: true });

    return UserService.get()
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

  const deleteUser = () =>
    UserService.remove().then(() => {
      dispatch({ type: UserReducerActionsEnum.SET_USER, payload: null });
    });

  return { ...state, updateUser, deleteUser };
};

export { useUser };

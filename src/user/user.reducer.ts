import type { Reducer } from "react";
import type { IUser } from "./user";

type UserReducerState = {
  user: IUser | null;
  isLoading: boolean;
};
const userReducerInitialState: UserReducerState = {
  isLoading: true,
  user: null,
};

enum UserReducerActionsEnum {
  SET_USER = "set_user",
  SET_LOADING = "set_loading",
}

type ReducerActionSetUser = {
  type: UserReducerActionsEnum.SET_USER;
  payload: IUser | null;
};
type ReducerActionSetLoading = {
  type: UserReducerActionsEnum.SET_LOADING;
  payload: boolean;
};
type UserReducerActions = ReducerActionSetUser | ReducerActionSetLoading;

const userReducer: Reducer<UserReducerState, UserReducerActions> = (prevState, action) => {
  switch (action.type) {
    case UserReducerActionsEnum.SET_USER: {
      return {
        ...prevState,
        user: action.payload,
      };
    }
    case UserReducerActionsEnum.SET_LOADING: {
      return {
        ...prevState,
        isLoading: action.payload,
      };
    }
    default: {
      throw new Error("unknown user reducer action");
    }
  }
};

export { userReducerInitialState, userReducer, UserReducerActionsEnum };
export type { UserReducerState, UserReducerActions };

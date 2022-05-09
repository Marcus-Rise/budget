import type { Dispatch, FC, PropsWithChildren, Reducer } from "react";
import { createContext, useContext, useReducer } from "react";
import { Popup, PopupType } from "./popup.component";

type ReducerState = {
  message: string;
  type: PopupType;
};
const initialState: ReducerState = {
  message: "",
  type: PopupType.INFO,
};

enum ReducerActionsEnum {
  OPEN = "open",
  CLOSE = "close",
}
type ReducerActionOpen = {
  type: ReducerActionsEnum.OPEN;
  payload: { title: string; type?: PopupType };
};
type ReducerActionClose = { type: ReducerActionsEnum.CLOSE };
type ReducerActions = ReducerActionOpen | ReducerActionClose;

const reducer: Reducer<ReducerState, ReducerActions> = (state, action) => {
  switch (action.type) {
    case ReducerActionsEnum.OPEN: {
      return {
        ...state,
        message: action.payload.title,
        type: action.payload.type ?? PopupType.INFO,
      };
    }
    case ReducerActionsEnum.CLOSE: {
      return {
        ...state,
        message: "",
      };
    }
    default: {
      throw new Error("Unknown popup reducer action");
    }
  }
};

const Context = createContext<{ state: ReducerState; dispatch: Dispatch<ReducerActions> }>({
  state: initialState,
  dispatch: () => null,
});

const PopupProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

const usePopup = () => {
  const { state, dispatch } = useContext(Context);

  return {
    title: state.message,
    type: state.type,
    open: (title: string, type?: PopupType) =>
      dispatch({ type: ReducerActionsEnum.OPEN, payload: { title, type } }),
    close: () => dispatch({ type: ReducerActionsEnum.CLOSE }),
  };
};

const PopupInContext: FC = () => {
  const { title, type, close } = usePopup();

  if (!title) {
    return null;
  }

  return <Popup type={type} onClose={close} title={title} />;
};

export { usePopup, PopupProvider, PopupInContext };

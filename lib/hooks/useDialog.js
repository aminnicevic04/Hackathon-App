"use client";

import { useReducer } from "react";

const dialogReducer = (state, action) => {
  switch (action.type) {
    case "OPEN": {
      if (state.dialogs[action.dialogId]) {
        return {
          ...state,
          dialogs: {
            ...state.dialogs,
            [action.dialogId]: { isOpen: true },
          },
        };
      }
      return state;
    }
    case "CLOSE": {
      if (state.dialogs[action.dialogId]) {
        return {
          ...state,
          dialogs: {
            ...state.dialogs,
            [action.dialogId]: { isOpen: false },
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
};

const useDialog = (dialogs) => {
  const [state, dispatch] = useReducer(dialogReducer, {
    dialogs: dialogs,
  });

  function openDialog(dialogId) {
    dispatch({ type: "OPEN", dialogId: dialogId });
  }

  function closeDialog(dialogId) {
    dispatch({ type: "CLOSE", dialogId: dialogId });
  }

  return { dialogs: state.dialogs, openDialog, closeDialog };
};

export default useDialog;

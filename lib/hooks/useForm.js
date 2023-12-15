import { useCallback, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }
    case "RESTART": {
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    }
    default:
      return state;
  }
};

const useForm = (initialInputs, initialValidity) => {
  const [formState, dispatch] = useReducer(reducer, {
    inputs: initialInputs,
    isValid: initialValidity,
  });

  const inputChangeHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "CHANGE", value, isValid, inputId: id });
  }, []);

  const restartForm = useCallback((inputData, formValidity, formId) => {
    dispatch({
      type: "RESTART",
      inputs: inputData,
      formIsValid: formValidity,
    });
    if (formId) {
      const form = document.getElementById(formId);
      form.reset();
    }
  }, []);

  return { formState, inputChangeHandler, restartForm };
};

export default useForm;

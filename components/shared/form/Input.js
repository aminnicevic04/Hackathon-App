"use client";

import { validate } from "../../../lib/validation";
import { useCallback, useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      const { value, validators } = action.payload;

      return {
        ...state,
        value: value,
        isValid: validate(value, validators),
      };
    }
    case "BLUR": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default: {
      return state;
    }
  }
};

const Input = ({
  id,
  value,
  type,
  placeholder,
  label,
  helperText,
  elementType,
  validators,
  onInputChange,
  initialValidity,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    value: value || "",
    isTouched: false,
    isValid: initialValidity || false,
  });

  useEffect(() => {
    onInputChange(id, state.value, state.isValid);
  }, [state.value, state.isValid, onInputChange, id]);

  const changeHandler = useCallback((e) => {
    dispatch({
      type: "CHANGE",
      payload: { value: e.target.value, validators: validators },
    });
  }, []);

  const blurHandler = useCallback(() => {
    dispatch({ type: "BLUR", payload: { value: "", validators: [] } });
  }, []);

  let element;

  if (elementType === "textarea") {
    element = (
      <textarea
        id={id}
        value={state.value}
        placeholder={placeholder}
        className={`p-3 rounded-md bg-[#2b2b2b] text-white resize-y h-36 ${
          !state.isValid && state.isTouched && "border border-red-600"
        }`}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    );
  } else {
    element = (
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        defaultValue={value}
        className={`p-2 bg-[#2b2b2b] text-white border border-solid border-gray-500 rounded-md  ${
          !state.isValid && state.isTouched && "border border-red-600"
        }`}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className={`text-xs font-bold uppercase ${
          !state.isValid && state.isTouched ? "text-red-600" : "text-gray-300"
        }`}
      >
        {label}
      </label>
      {element}
      {!state.isValid && state.isTouched && (
        <p className="text-xs text-red-600">{helperText}</p>
      )}
    </div>
  );
};

export default Input;

import { useReducer, useEffect } from "react";

function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: action.value.length > 0 ? true : false,
      };

    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };

    case "CLEAR_INPUT":
      return {
        ...state,
        value: "",
        isValid: false,
        isTouched: false,
      };

    default:
      return state;
  }
}

const initalState = {
  value: "",
  isValid: false,
  isTouched: false,
};

const Input = ({
  id,
  type,
  description,
  placeholder,
  notify,
  inputHandler,
  formInpValue,
  formInpIsValid,
  formClear,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: formInpValue || "",
    isValid: formInpIsValid || false,
    isTouched: false,
  });

  const { value, isValid, isTouched } = inputState;

  useEffect(() => {
    inputHandler(id, value, isValid);
  }, [id, value, isValid, inputHandler]);

  const handleInput = (e) => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
    });
  };

  const handleTouch = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const clearInput = (e) => {
    dispatch({
      type: "CLEAR_INPUT",
      value: "",
    });
  };

  useEffect(() => {
    formClear && clearInput();
  }, [formClear]);

  const inputsContext =
    type === "textarea" ? (
      <div className="w-full mt-1">
        <textarea
          id={id}
          className="textAreaStyle"
          value={value}
          placeholder={placeholder}
          onChange={handleInput}
          onBlur={handleTouch}
        />
      </div>
    ) : (
      <div className="w-full mt-1">
        <input
          id={id}
          type="text"
          className="inputStyle"
          value={value}
          placeholder={placeholder}
          onChange={handleInput}
          onBlur={handleTouch}
        />
      </div>
    );

  return (
    <>
      <div className="w-full text-left text-sm text-gray-800 pt-1">
        {description}
      </div>
      {inputsContext}
      {!isValid && isTouched && (
        <p className="text-sm text-red-700 pt-1">{notify}</p>
      )}
    </>
  );
};

export default Input;

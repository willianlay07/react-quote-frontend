import { useReducer, useCallback, useState } from "react";

import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

function formReducer(state, action) {
  switch (action.type) {
    case "INPUT_CHANGE":
      /* eslint-disable */
      let formStatus = true;
      for (const eachInputId in state.inputs) {
        if (eachInputId === action.inputId) {
          formStatus = formStatus && action.isValid;
        } else {
          formStatus = formStatus && state.inputs[eachInputId].isValid;
        }
      }

      return {
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        formIsValid: formStatus,
      };

    // case "RESET":
    //   return {
    //     inputs: {
    //       desc: {
    //         value: "",
    //         isValid: false,
    //       },
    //       bywho: {
    //         value: "",
    //         isValid: false,
    //       },
    //     },
    //     formIsValid: false,
    //   };

    default:
      return state;
  }
}

const formInitial = {
  inputs: {
    desc: {
      value: "",
      isValid: false,
    },
    bywho: {
      value: "",
      isValid: false,
    },
  },
  formIsValid: false,
};

const AddQuote = () => {
  const [formState, dispatch] = useReducer(formReducer, formInitial);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [formClear, setFormClear] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setIsError("");
    setFormClear(false);
    setIsSuccess(false);

    const controller = new AbortController();

    const url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await fetch(`${url}`, {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: formState.inputs.desc.value,
          bywho: formState.inputs.bywho.value,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw responseData.message;
      }

      if (responseData.status === "success") {
        // dispatch({
        //   type: "RESET",
        // });
        setFormClear(true);
        setIsSuccess(true);
      } else {
        setIsError(responseData.message);
      }
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center text-gray-800 text-[30px] font-bold py-5 mt-5">
          Add New Quote
        </h2>
        <form onSubmit={submitHandler}>
          <div className="formbox">
            <Input
              id="desc"
              type="textarea"
              description="Description"
              placeholder="Enter description"
              notify="Please enter description"
              inputHandler={inputHandler}
              formInpValue={formState.inputs.desc.value}
              formInpIsValid={formState.inputs.desc.isValid}
              formClear={formClear}
            />
            <Input
              id="bywho"
              type="text"
              description="By who?"
              placeholder="Enter by who"
              notify="Please enter by who?"
              inputHandler={inputHandler}
              formInpValue={formState.inputs.bywho.value}
              formInpIsValid={formState.inputs.bywho.isValid}
              formClear={formClear}
            />
            {isLoading ? (
              <Loading />
            ) : (
              <div className="w-full mt-5">
                <Button
                  type="submit"
                  text="Add"
                  formStatus={!formState.formIsValid}
                />
              </div>
            )}
            {isSuccess && <Success />}
            {isError.length > 0 && <Error text={isError} />}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddQuote;

import React from "react";

const Button = ({ type, text, formStatus }) => {
  return (
    <>
      <button
        type="submit"
        className="w-full h-10 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-700"
        disabled={formStatus}
      >
        {text}
      </button>
    </>
  );
};

export default Button;

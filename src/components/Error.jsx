import React from "react";

const Error = ({ text }) => {
  return (
    <div className="max-w-lg mx-auto text-center py-5 text-lg text-red-700 font-semibold">
      💥 {text}
    </div>
  );
};

export default Error;

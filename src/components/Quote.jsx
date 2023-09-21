import React from "react";

const Quote = ({ description, author }) => {
  return (
    <>
      <div className="quoteBlock">
        <h3 className="text-[15px]">{description}</h3>
        <br />
        <p className="text-gray-600">- {author} -</p>
      </div>
    </>
  );
};

export default Quote;

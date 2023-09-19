import React from "react";
import Quote from "./Quote";

const QuoteList = ({ quote }) => {
  return (
    <>
      <div className="container mx-auto px-4 mb-10">
        <div className="columns-2 md:columns-3 lg:columns-4 space-y-4 p-3">
          {quote.map((each) => (
            <Quote
              key={each._id}
              description={each.description}
              author={each.bywho}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default QuoteList;

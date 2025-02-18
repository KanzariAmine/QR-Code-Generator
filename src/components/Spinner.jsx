import React from "react";

const Spinner = () => {
  return (
    <div
      className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-amber-500 rounded-full dark:text-amber-500"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;

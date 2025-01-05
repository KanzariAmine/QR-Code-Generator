import clsx from "clsx";
import React from "react";
const Toast = ({ message, onClose, type }) => {
  return (
    <div
      className={clsx(
        "fixed top-20 right-5 max-w-xs",
        type === "successes"
          ? "bg-teal-300 border border-teal-200 text-sm text-teal-800"
          : "bg-red-100 border border-red-200 text-sm text-red-800",
        "rounded-lg animate-fade-in-right"
      )}
      role="alert"
      tabIndex="-1"
      aria-labelledby="hs-toast-soft-color-dark-label"
    >
      <div id="hs-toast-soft-color-dark-label" className="flex p-4">
        {message}
        <div className="ms-auto">
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-gray-800  focus:outline-none focus:opacity-100 dark:text-white"
            aria-label="Close"
            onClick={() => onClose()}
          >
            <span className="sr-only">Close</span>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;

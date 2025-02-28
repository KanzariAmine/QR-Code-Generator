import React from "react";

const Input = ({
  label,
  inputType,
  placeholder,
  name,
  value,
  onChange,
  width = "full", // default to 'full' (w-full in Tailwind)
}) => {
  // Ensure width is a valid Tailwind class
  const widthClass = width === "full" ? "w-full" : `w-${width}`;
  return (
    <div>
      <label
        htmlFor="input-label"
        className="block text-sm/6 text-gray-900 font-montserrat font-bold"
      >
        {label}
      </label>
      <div className="mt-2">
        <div
          className={`h-11 shadow-sm flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 ${widthClass}`}
        >
          <input
            id="input-label"
            name={name}
            value={value}
            type={inputType}
            onChange={onChange}
            placeholder={placeholder}
            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
};

export default Input;

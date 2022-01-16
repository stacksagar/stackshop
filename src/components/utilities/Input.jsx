import React from "react";

const Input = ({
  type,
  placeholder,
  name,
  notLabel,
  optional,
  full,
  np,
  ...all
}) => (
  <div className={`w-full box-border`}>
    {!notLabel && (
      <label
        className="inline-flex capitalize mb-1 text-white text-xs font-medium mt-3"
        htmlFor={name}
      >
        <span>{name}</span>
        <small className="ml-2 text-xs">
          <small> {optional ? "(optional)" : "*"} </small>
        </small>
      </label>
    )}
    <input
      {...all}
      className={`rounded px-3 w-full py-2 text-sm bg-gray-300 text-black ring-1 box-border focus:ring outline-none focus:bg-white`}
      type={type || "text"}
      name={name}
      id={name}
      placeholder={np ? name.split("_").join(" ") : placeholder}
    />
  </div>
);
export default Input;

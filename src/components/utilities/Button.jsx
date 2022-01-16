import React from "react";
import {CheckCircleIcon} from "@heroicons/react/solid";
const Button = ({
  text,
  loading,
  success,
  type,
  danger,
  className,
  ...others
}) => {
  return (
    <button
      {...others}
      type={type || "button"}
      className={`${
        danger ? "bg-red-500" : "bg-blue-500"
      } flex items-center justify-center px-3 py-2 text-sm focus:ring rounded ${className} text-white`}
    >
      {text}
      {loading && (
        <span
          className="w-4 h-4 ml-3 block border-2 border-gray-300 rounded-full animate-spin"
          style={{borderRightColor: "transparent"}}
        />
      )}
      {success && <CheckCircleIcon className="ml-3 w-5 text-green-400" />}
    </button>
  );
};

export default Button;

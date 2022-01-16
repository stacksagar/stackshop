import {CheckIcon} from "@heroicons/react/solid";
import React from "react";
import Button from "../utilities/Button";
const CheckoutStep = ({
  children,
  step,
  heading,
  active,
  completed,
  setCompletedStep,
  setActiveStep,
  buttonText,
  loading,
  continue_button,
}) => {
  return (
    <div className="bg-gray-50 border">
      <div
        className={`${
          active ? "bg-blue-500" : "bg-white"
        } h-header_sm w-full flex pl-2 justify-start items-center`}
      >
        <span className="w-5 h-5 rounded-full bg-gray-100 text-xs text-black flex justify-center items-center">
          {step}
        </span>
        <p
          className={`${
            active ? "text-white " : "text-gray-600"
          } ml-3 text-sm tracking-wider font-semibold uppercase`}
        >
          {heading}
        </p>
        {completed && <CheckIcon className="w-4 ml-1" />}
      </div>
      <div>
        {children}
        {active && (
          <div className="p-3">
            {buttonText && (
              <Button
                onClick={() => {
                  continue_button();
                  setCompletedStep((prev) => [...prev, step]);
                  setActiveStep(step + 1);
                }}
                text={buttonText}
                loading={loading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutStep;

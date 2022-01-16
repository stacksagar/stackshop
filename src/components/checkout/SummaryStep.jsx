import React from "react";
import CheckoutStep from "./CheckoutStep";
import CartProducts from "../cart/CartProducts";
import {useSelector} from "react-redux";
import Button from "../utilities/Button";
const SummaryStep = ({
  step,
  active,
  setCompletedStep,
  setActiveStep,
  ...all
}) => {
  const {user} = useSelector((state) => state.auth);
  return (
    <CheckoutStep
      {...all}
      active={active}
      step={step}
      setActiveStep={setActiveStep}
      setCompletedStep={setCompletedStep}
      loading={false}
    >
      {active && (
        <>
          <div className="flex flex-col p-3">
            <CartProducts />
          </div>
          <div className="flex justify-between px-5">
            <p className="flex items-center text-xs">
              Order confirmation email will be sent to
              <b className="ml-1"> {user?.email} </b>
            </p>
            <Button
              onClick={() => {
                setCompletedStep((prev) => [...prev, step]);
                setActiveStep(step + 1);
              }}
              text="Continue"
            />
          </div>
        </>
      )}
    </CheckoutStep>
  );
};

export default SummaryStep;

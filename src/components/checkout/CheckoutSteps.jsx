import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import AddressStep from "./AddressStep";
import PeymentStep from "./PeymentStep";
import SummaryStep from "./SummaryStep";
import LoginStep from "./LoginStep";

const CheckoutSteps = ({setOrderState}) => {
  const {authenticated} = useSelector((state) => state.auth);
  const [completedStep, setCompletedStep] = useState([1]);
  const [activeStep, setActiveStep] = useState();

  useEffect(() => {
    setActiveStep(() => (!authenticated ? 1 : 2));
  }, [authenticated]);

  return (
    <div className="w-full flex space-y-5 flex-col h-full overflow-y-auto">
      <LoginStep
        step={1}
        active={!authenticated && activeStep === 1}
        completed={authenticated}
        setCompletedStep={setCompletedStep}
        setActiveStep={setActiveStep}
        heading="login"
      />

      <AddressStep
        step={2}
        active={activeStep === 2}
        completed={completedStep.includes(2)}
        setCompletedStep={setCompletedStep}
        setActiveStep={setActiveStep}
        heading="delivery address"
        setOrderState={setOrderState}
      />

      <SummaryStep
        step={3}
        active={activeStep === 3}
        completed={completedStep.includes(3)}
        setCompletedStep={setCompletedStep}
        setActiveStep={setActiveStep}
        heading="order summary"
      />

      <PeymentStep
        setOrderState={setOrderState}
        step={4}
        setCompletedStep={setCompletedStep}
        completed={completedStep.includes(4)}
        active={activeStep === 4}
        setActiveStep={setActiveStep}
        heading="peyment options"
      />
    </div>
  );
};

export default CheckoutSteps;

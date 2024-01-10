import React, { useEffect, useState } from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import { CheckIcon } from "@heroicons/react/24/outline";
import { RequestStatus } from "../../enums/refund-request-status";

const steps = ["Pending Confirmation", "Pending Transfer", "Completed"];

export default function ButtonStepper({ item }) {
   const [activeStep, setActiveStep] = useState(0);
   useEffect(() => {
      if (item === RequestStatus.Confirmation) setActiveStep(0);
      if (item === RequestStatus.Transfer) setActiveStep(1);
      if (item === RequestStatus.Completed) setActiveStep(2);
   }, [item]);
   return (
      <Stepper sx={{ width: "100%" }}>
         {steps.map((step, index) => (
            <Step
               key={step}
               indicator={
                  <StepIndicator
                     variant={activeStep <= index ? "soft" : "solid"}
                     color={activeStep < index ? "neutral" : "primary"}
                  >
                     {activeStep <= index ? index + 1 : <CheckIcon />}
                  </StepIndicator>
               }
               sx={{
                  "&::after": {
                     ...(activeStep > index &&
                        index !== 2 && { bgcolor: "primary.solidBg" }),
                  },
               }}
            >
               <StepButton>{step}</StepButton>
            </Step>
         ))}
      </Stepper>
   );
}

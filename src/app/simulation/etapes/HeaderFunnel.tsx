import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { useWizard } from "react-use-wizard";

const titles = ["Le bâtiment", "Le chauffage", "L'eau chaude"];
const displayStepCount = 3;

export const HeaderFunnel = () => {
  const { activeStep } = useWizard();

  // NB: the DSFR doesn't allow to have more than 8 steps...
  const displayStep = activeStep < 6 ? 1 : activeStep < 9 ? 2 : 3;

  return (
    <>
      <Stepper
        currentStep={displayStep}
        stepCount={displayStepCount}
        nextTitle={activeStep < displayStepCount ? titles[activeStep + 1] : ""}
        title={titles[displayStep - 1]}
      />
    </>
  );
};

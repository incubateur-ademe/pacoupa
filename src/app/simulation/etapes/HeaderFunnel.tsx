import { fr } from "@codegouvfr/react-dsfr";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { useWizard } from "react-use-wizard";

import { Box } from "@/dsfr";

const titles = ["Le bâtiment", "Le chauffage", "L'eau chaude"];
const displayStepCount = 3;

export const HeaderFunnel = () => {
  const { activeStep } = useWizard();

  // NB: the DSFR doesn't allow to have more than 8 steps...
  const displayStep = activeStep < 6 ? 0 : activeStep < 9 ? 1 : 2;

  return (
    <Box className={fr.cx("fr-mt-4w")}>
      <Stepper
        currentStep={displayStep + 1}
        stepCount={displayStepCount}
        nextTitle={displayStep < displayStepCount ? titles[displayStep + 1] : ""}
        title={titles[displayStep]}
      />
    </Box>
  );
};

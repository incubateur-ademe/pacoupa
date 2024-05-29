"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { useWizard } from "react-use-wizard";

import { Box } from "@/dsfr";

// Be careful: the DSFR doesn't allow to have more than 8 steps... So ensure that each phase has less than 8 steps.
const phases = [
  ["Le bâtiment", 6],
  ["Le chauffage", 3],
  ["L'eau chaude", 2],
] as const;

const findPhase = (step: number) => {
  let phase = 0;

  let currentStep = step;

  for (let i = 0; i < phases.length; i++) {
    if (currentStep >= phases[i][1]) {
      currentStep = currentStep - phases[i][1];
      phase++;
    } else {
      return {
        phase: phases[phase],
        currentStep,
        nextTitle: phases[phase + 1]?.[0] ?? "",
      };
    }
  }

  throw new Error("Invalid step");
};

/*
 * Note: we use the DSFR stepper in a unusual way. The DSFR stepper is limited to only 8 steps before the progression bar is not displayed anymore.
 *
 * So we use 3 phases to group the steps and display the progression bar.
 * There is still a limitation, because the nextTitle is not displayed when it is the last step of a phase. So we can't
 * use it for our case.
 *
 */
export const HeaderFunnel = () => {
  const { activeStep } = useWizard();

  const { phase, currentStep } = findPhase(activeStep);

  return (
    <Box className={fr.cx("fr-mt-4w")}>
      {/* We can't use nextTitle because it is not shown when it is the last step of a phase... */}
      <Stepper currentStep={currentStep + 1} stepCount={phase[1]} title={phase[0]} />
    </Box>
  );
};

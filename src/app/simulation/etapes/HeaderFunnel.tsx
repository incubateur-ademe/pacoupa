import { fr } from "@codegouvfr/react-dsfr";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { useWizard } from "react-use-wizard";

import { Box } from "@/dsfr";

type Props = {
  titles: string[];
};

export const HeaderFunnel = ({ titles }: Props) => {
  const { activeStep, stepCount } = useWizard();

  return (
    <>
      <Box className={fr.cx("fr-mb-8w")}>
        <Stepper
          currentStep={activeStep + 1}
          nextTitle={activeStep < stepCount ? titles[activeStep + 1] : ""}
          stepCount={stepCount}
          title={titles[activeStep]}
        />
      </Box>
    </>
  );
};

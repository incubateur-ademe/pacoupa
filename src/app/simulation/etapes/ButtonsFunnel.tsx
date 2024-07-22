"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useWizard } from "react-use-wizard";

import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { Box } from "@/dsfr";
import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";

import { ETAPE_ANNEE, ETAPE_NB_LOGEMENTS } from "./WizardForm";

type Props = {
  disabled?: boolean;
};

export const ButtonsFunnel = ({ disabled }: Props = { disabled: false }) => {
  const { activeStep, isFirstStep, isLastStep, previousStep, goToStep } = useWizard();
  const { store } = usePacoupaSessionStorage();

  return (
    <>
      <Box className={fr.cx("fr-mb-6w")}>
        <ButtonsWrapper align="center">
          {!isFirstStep && (
            <Button
              type="button"
              priority="tertiary no outline"
              iconId="fr-icon-arrow-left-line"
              nativeButtonProps={{
                onClick: () => {
                  if (activeStep === ETAPE_NB_LOGEMENTS && store?.annee !== undefined && store.annee >= 2000) {
                    goToStep(ETAPE_ANNEE);
                  } else {
                    previousStep();
                  }
                },
              }}
            >
              Retour
            </Button>
          )}

          <Button nativeButtonProps={{ disabled }}>{isLastStep ? "Voir les résultats" : "Suivant"}</Button>
        </ButtonsWrapper>
      </Box>
    </>
  );
};

"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useWizard } from "react-use-wizard";

import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { Box } from "@/dsfr";

type Props = {
  disabled?: boolean;
};

export const ButtonsFunnel = ({ disabled }: Props = { disabled: false }) => {
  const { isFirstStep, isLastStep, previousStep } = useWizard();

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
                onClick: () => previousStep(),
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

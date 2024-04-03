"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { redirect } from "next/navigation";
import { useWizard } from "react-use-wizard";

import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { Box } from "@/dsfr";

type Props = {
  disabled?: boolean;
};

export const FooterFunnel = ({ disabled }: Props = { disabled: false }) => {
  const { isFirstStep, isLastStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <Box className={fr.cx("fr-mb-6w")}>
        <ButtonsWrapper align="center">
          {!isFirstStep && (
            <Button
              priority="tertiary"
              iconId="fr-icon-arrow-left-line"
              nativeButtonProps={{
                onClick: () => previousStep(),
              }}
            >
              Retour
            </Button>
          )}

          {isLastStep ? (
            <Button
              nativeButtonProps={{
                // TODO: problème pour la redirection
                onClick: () => redirect("/simulation/resultats"),
              }}
            >
              Voir les résultats
            </Button>
          ) : (
            <>
              <Button nativeButtonProps={{ disabled }}>Suivant</Button>
            </>
          )}
        </ButtonsWrapper>
      </Box>
    </>
  );
};

import { fr } from "@codegouvfr/react-dsfr";
import { redirect } from "next/navigation";
import { useWizard } from "react-use-wizard";

import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { Box } from "@/dsfr";

export const FooterFunnel = () => {
  const { isFirstStep, isLastStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <Box className={fr.cx("fr-mb-8w")}>
        <ButtonsWrapper align="right">
          {!isFirstStep && (
            <Button
              priority="secondary"
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
            <Button
              nativeButtonProps={{
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick: () => nextStep(),
              }}
            >
              Suivant
            </Button>
          )}
        </ButtonsWrapper>
      </Box>
    </>
  );
};

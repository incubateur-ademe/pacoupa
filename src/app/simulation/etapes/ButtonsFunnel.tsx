"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useRouter } from "next/navigation";
import { useWizard } from "react-use-wizard";

import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { Box } from "@/dsfr";

type Props = {
  disabled?: boolean;
};

export const ButtonsFunnel = ({ disabled }: Props = { disabled: false }) => {
  const { isFirstStep, isLastStep, previousStep } = useWizard();
  const router = useRouter();

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
                onClick: () => router.push("/simulation/resultat"),
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

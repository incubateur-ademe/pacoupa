"use client";

import { useWizard } from "react-use-wizard";

import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";

type Props = {
  disabled?: boolean;
};

export const ButtonsFunnel = ({ disabled }: Props = { disabled: false }) => {
  const { isFirstStep, isLastStep, previousStep } = useWizard();

  return (
    <>
      <div className="mb-12">
        <ButtonsWrapper align="center">
          {!isFirstStep && (
            <Button
              type="button"
              priority="tertiary no outline"
              iconId="fr-icon-arrow-left-line"
              nativeButtonProps={{
                onClick: () => {
                  previousStep();
                },
              }}
            >
              Retour
            </Button>
          )}

          <Button nativeButtonProps={{ disabled }}>{isLastStep ? "Voir les résultats" : "Suivant"}</Button>
        </ButtonsWrapper>
      </div>
    </>
  );
};

"use client";

import { push } from "@socialgouv/matomo-next";
import { useWizard } from "react-use-wizard";

import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { matomoCategory } from "@/lib/matomo-events";

type Props = {
  disabled?: boolean;
};

export const ButtonsFunnel = ({ disabled }: Props = { disabled: false }) => {
  const { isFirstStep, isLastStep, previousStep, activeStep } = useWizard();

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
                  push(["trackEvent", matomoCategory.formulaire, "Clic Retour", `Retour Q${activeStep + 1}`]);
                  previousStep();
                },
              }}
            >
              Retour
            </Button>
          )}

          <Button
            nativeButtonProps={{
              disabled,
              onClick: () => {
                if (isLastStep) {
                  push(["trackEvent", matomoCategory.formulaire, "Clic Fin", "Voir résultats"]);
                } else {
                  push(["trackEvent", matomoCategory.formulaire, "Clic Retour", `Retour Q${activeStep + 1}`]);
                }
              },
            }}
          >
            {isLastStep ? "Voir les résultats" : "Suivant"}
          </Button>
        </ButtonsWrapper>
      </div>
    </>
  );
};

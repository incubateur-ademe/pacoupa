"use client";

import { SegmentedControl, type SegmentedControlProps } from "@codegouvfr/react-dsfr/SegmentedControl";
import { push } from "@socialgouv/matomo-next";
import { useRouter, useSearchParams } from "next/navigation";

import { Text } from "@/dsfr/base/typography";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { Matomo } from "@/lib/matomo-events";
import { createSearchParams } from "@/utils/searchParams";

import { Callout } from "./Callout";

const wordings: Record<TravauxNiveauIsolation, string> = {
  Global: "En plus du système de chauffage, vous projetez d’isoler la toiture, les murs, le sol et les fenêtres.",
  Partiel:
    "En plus du système de chauffage, vous projetez d'avoir une isolation à minima pour la toiture et les fenêtres.",
  Aucun: "Vous projetez de remplacer uniquement votre système de chauffage.",
};

type Props = {
  travauxNiveauIsolation: TravauxNiveauIsolation;
};

export const TravauxNiveauIsolationSegmentedControl = ({ travauxNiveauIsolation }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <>
      <SegmentedControl
        legend={
          <Text variant="sm" className="mb-0">
            Travaux d’isolation de la copropriété
          </Text>
        }
        name="travaux-isolation"
        aria-required
        aria-describedby="travaux-isolation-message"
        segments={
          (["Global", "Partiel", "Aucun"] as const).map(label => ({
            label,
            nativeInputProps: {
              value: label,
              checked: (label === "Global" && !travauxNiveauIsolation) || travauxNiveauIsolation === label,
              onChange: () => {
                push(["trackEvent", Matomo.Category["Page résultats"], "Clic Travaux", `${label}`]);

                router.push(
                  `/simulation/resultat?${createSearchParams({
                    searchParams,
                    name: "travauxNiveauIsolation",
                    value: label,
                  })}`,
                  { scroll: false },
                );
              },
            },
          })) as unknown as SegmentedControlProps.Segments
        }
      />

      {travauxNiveauIsolation && (
        <div className="mt-1 mb-4 -ml-2">
          <Callout content={wordings[travauxNiveauIsolation]} type="neutral" />
        </div>
      )}
    </>
  );
};

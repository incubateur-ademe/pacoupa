"use client";

import { SegmentedControl, type SegmentedControlProps } from "@codegouvfr/react-dsfr/SegmentedControl";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { useRouter, useSearchParams } from "next/navigation";

import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { createSearchParams } from "@/utils/searchParams";

const wordings: Record<TravauxNiveauIsolation, string> = {
  Global: "En plus du système de chauffage, vous projetez d’isoler la toiture, les murs, le sol et les fenêtres.",
  Partiel:
    "En plus du système de chauffage, vous projetez d'avoir une isolation à minima pour la toiture et les fenêtres.",
  Aucun: "Vous projetez de remplacer uniquement votre système de chauffage.",
};

export const TravauxNiveauIsolationSegmentedControl = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const travauxNiveauIsolation = searchParams.get("travauxNiveauIsolation") as TravauxNiveauIsolation | null;

  return (
    <>
      <SegmentedControl
        legend={<>Travaux d’isolation de la copropriété</>}
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
                router.push(
                  `/simulation/resultat?${createSearchParams<TravauxNiveauIsolation>({
                    baseSearchParams: searchParams,
                    name: "travauxNiveauIsolation",
                    value: label,
                  })}`,
                );
              },
            },
          })) as unknown as SegmentedControlProps.Segments
        }
      />

      {travauxNiveauIsolation && <p className={cx("mt-4")}>{wordings[travauxNiveauIsolation]}</p>}
    </>
  );
};

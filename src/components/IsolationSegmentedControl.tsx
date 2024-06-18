"use client";

import { SegmentedControl, type SegmentedControlProps } from "@codegouvfr/react-dsfr/SegmentedControl";
import { useRouter, useSearchParams } from "next/navigation";

import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { createSearchParams } from "@/utils/searchParams";

export const TravauxNiveauIsolationSegmentedControl = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const travauxNiveauIsolation = searchParams.get("travauxNiveauIsolation");

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
    </>
  );
};

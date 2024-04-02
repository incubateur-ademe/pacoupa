import { fr } from "@codegouvfr/react-dsfr";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { useWizard } from "react-use-wizard";

import { P } from "@/dsfr";

export const Step6 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <P>
        Votre appartement a-t-il des <strong>espaces extérieurs personnels</strong> ?
      </P>

      {/* <SegmentedControl
        legend=""
        segments={[
          {
            label: "Oui",
          },
          {
            label: "Non",
          },
        ]}
      /> */}

      <P className={fr.cx("fr-mt-8v")}>Lesquels ?</P>

      <Checkbox
        legend="Légende pour l’ensemble de champs"
        options={[
          {
            label: "Balcon",
            nativeInputProps: {
              name: "espaces-exterieurs-personnels",
              value: "balcon",
            },
          },
          {
            label: "Toit terrasse",
            nativeInputProps: {
              name: "espaces-exterieurs-personnels",
              value: "toit terrasse",
            },
          },
          {
            label: "Autres",
            nativeInputProps: {
              name: "espaces-exterieurs-personnels",
              value: "autres",
            },
          },
        ]}
        state="default"
        stateRelatedMessage=""
      />
    </>
  );
};

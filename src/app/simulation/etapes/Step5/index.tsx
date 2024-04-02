import { fr } from "@codegouvfr/react-dsfr";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { SegmentedControl } from "@codegouvfr/react-dsfr/SegmentedControl";
import { useWizard } from "react-use-wizard";

import { P } from "@/dsfr";

export const Step5 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <P>
        Votre bâtiment a-t-il des <strong>espaces extérieurs communs</strong> ?
      </P>

      <SegmentedControl
        legend=""
        segments={[
          {
            label: "Oui",
          },
          {
            label: "Non",
          },
        ]}
      />

      <P className={fr.cx("fr-mt-8v")}>Lesquels ?</P>

      <Checkbox
        legend="Légende pour l’ensemble de champs"
        options={[
          {
            label: "Jardin",
            nativeInputProps: {
              name: "espaces-exterieurs-communs",
              value: "jardin",
            },
          },
          {
            label: "Parking extérieur",
            nativeInputProps: {
              name: "espaces-exterieurs-communs",
              value: "parking exterieur",
            },
          },
          {
            label: "Toit terrasse",
            nativeInputProps: {
              name: "espaces-exterieurs-communs",
              value: "toit terrasse",
            },
          },
          {
            label: "Autres",
            nativeInputProps: {
              name: "espaces-exterieurs-communs",
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

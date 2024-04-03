"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { SegmentedControl, type SegmentedControlProps } from "@codegouvfr/react-dsfr/SegmentedControl";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { OuiNonLabels, OuiNonSchema } from "@/utils/zod";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schema = z.object({
  possedeEspacesExterieursCommuns: OuiNonSchema,
  espacesExterieursCommuns: z.array(z.string({ required_error: "Les espaces extérieurs communs sont obligatoires" })),
});
// .superRefine((data, context) => {
//   if (data.possedeEspacesExterieursCommuns === "Oui") {
//     if (data.espacesExterieursCommuns.length === 0) {
//       context.addIssue({
//         code: "custom",
//         path: ["espacesExterieursCommuns"],
//         message: "Les espaces extérieurs communs sont obligatoires",
//       });
//     }
//   }
// });

export const Step5 = () => {
  const [radioState, setRadioState] = useState<(typeof OuiNonLabels)[number]>();

  useEffect(() => {
    if (radioState === "Non") {
      (document.getElementsByName("espacesExterieursCommuns") as NodeListOf<HTMLInputElement>).forEach(
        (el: HTMLInputElement) => {
          el.checked = false;
        },
      );
    }
  }, [radioState]);

  return (
    <Box>
      <HeaderFunnel />
      <P>
        Votre bâtiment a-t-il des <strong>espaces extérieurs communs</strong> ?
      </P>

      <WizardForm
        schema={schema}
        render={({ errors }) => (
          <>
            <SegmentedControl
              legend=""
              name="possedeEspacesExterieursCommuns"
              segments={
                OuiNonLabels.map(label => ({
                  label,
                  nativeInputProps: {
                    value: label,
                    checked: radioState === label,
                    onChange: () => setRadioState(label),
                  },
                })) as unknown as SegmentedControlProps.Segments
              }
            />

            <P className={fr.cx("fr-mt-8v")}>Lesquels ?</P>

            <Checkbox
              legend="Légende pour l’ensemble de champs"
              disabled={radioState === "Oui" ? false : true}
              options={[
                {
                  label: "Jardin",
                  nativeInputProps: {
                    name: "espacesExterieursCommuns",
                    value: "jardin",
                  },
                },
                {
                  label: "Parking extérieur",
                  nativeInputProps: {
                    name: "espacesExterieursCommuns",
                    value: "parking exterieur",
                  },
                },
                {
                  label: "Toit terrasse",
                  nativeInputProps: {
                    name: "espacesExterieursCommuns",
                    value: "toit terrasse",
                  },
                },
                {
                  label: "Autres",
                  nativeInputProps: {
                    name: "espacesExterieursCommuns",
                    value: "autres",
                  },
                },
              ]}
              state={errors?.espacesExterieursCommuns?._errors ? "error" : "default"}
              stateRelatedMessage={errors?.espacesExterieursCommuns?._errors}
            />
          </>
        )}
      />
    </Box>
  );
};

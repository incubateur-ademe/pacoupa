"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { SegmentedControl, type SegmentedControlProps } from "@codegouvfr/react-dsfr/SegmentedControl";
import { useState } from "react";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { OuiNonLabels, OuiNonSchema } from "@/utils/zod";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schema = z.object({
  possedeEspacesExterieursPersonnels: OuiNonSchema,
  espacesExterieursPersonnels: z.string({ required_error: "Les espaces extérieurs personnels sont obligatoires" }),
});

export const Step6 = () => {
  const [radioState, setRadioState] = useState<(typeof OuiNonLabels)[number]>();

  return (
    <Box>
      <HeaderFunnel />
      <P>
        Votre appartement a-t-il des <strong>espaces extérieurs personnels</strong> ?
      </P>

      <WizardForm
        schema={schema}
        render={({ errors }) => (
          <>
            <SegmentedControl
              legend=""
              name="possedeEspacesExterieursPersonnels"
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
              options={[
                {
                  label: "Balcon",
                  nativeInputProps: {
                    name: "espacesExterieursPersonnels",
                    value: "balcon",
                  },
                },
                {
                  label: "Toit terrasse",
                  nativeInputProps: {
                    name: "espacesExterieursPersonnels",
                    value: "toit terrasse",
                  },
                },
                {
                  label: "Autres",
                  nativeInputProps: {
                    name: "espacesExterieursPersonnels",
                    value: "autres",
                  },
                },
              ]}
              state={errors?.espacesExterieursPersonnels?._errors ? "error" : "default"}
              stateRelatedMessage={errors?.espacesExterieursPersonnels?._errors}
            />
          </>
        )}
      />
    </Box>
  );
};

"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { SegmentedControl, type SegmentedControlProps } from "@codegouvfr/react-dsfr/SegmentedControl";
import { useState } from "react";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { store } from "@/lib/store";
import { OuiNonLabels } from "@/utils/zod";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schemaOui = z.object({
  possedeEspacesExterieursPersonnels: z.literal("Oui"),
  espacesExterieursPersonnels: z
    .array(z.string({ required_error: "Les espaces extérieurs personnels sont obligatoires" }), {
      errorMap: (issue, context) => {
        if (issue.code === "invalid_type") {
          return { message: "Les espaces extérieurs personnels sont obligatoires" };
        }
        return { message: context.defaultError };
      },
    })
    .nonempty({ message: "Les espaces extérieurs personnels sont obligatoires" }),
});
const schemaNon = z.object({
  possedeEspacesExterieursPersonnels: z.literal("Non", {
    errorMap: (issue, context) => {
      if (issue.code === "invalid_literal") {
        return { message: "La question est obligatoire" };
      }
      return { message: context.defaultError };
    },
  }),
});

export const Step6 = () => {
  const initialState = store.get();
  const [radioState, setRadioState] = useState<(typeof OuiNonLabels)[number] | undefined>(
    initialState.possedeEspacesExterieursPersonnels as (typeof OuiNonLabels)[number] | undefined,
  );

  return (
    <Box>
      <HeaderFunnel />
      <P>
        Votre appartement a-t-il des <strong>espaces extérieurs personnels</strong> ?
      </P>

      <WizardForm
        schema={radioState === "Oui" ? schemaOui : schemaNon}
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

            {errors?.possedeEspacesExterieursPersonnels?._errors && (
              <p className={fr.cx("fr-message", "fr-message--error", "fr-mt-2w")}>
                {errors?.possedeEspacesExterieursPersonnels?._errors}
              </p>
            )}

            <P className={fr.cx("fr-mt-8v")}>Lesquels ?</P>

            <Checkbox
              legend="Légende pour l’ensemble de champs"
              disabled={radioState === "Oui" ? false : true}
              options={[
                {
                  label: "Balcon",
                  nativeInputProps: {
                    defaultChecked: initialState.espacesExterieursPersonnels?.includes("balcon"),
                    name: "espacesExterieursPersonnels",
                    value: "balcon",
                  },
                },
                {
                  label: "Toit terrasse",
                  nativeInputProps: {
                    defaultChecked: initialState.espacesExterieursPersonnels?.includes("toit terrasse"),
                    name: "espacesExterieursPersonnels",
                    value: "toit terrasse",
                  },
                },
                {
                  label: "Autres",
                  nativeInputProps: {
                    defaultChecked: initialState.espacesExterieursPersonnels?.includes("autres"),
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

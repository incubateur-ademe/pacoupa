"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { SegmentedControl, type SegmentedControlProps } from "@codegouvfr/react-dsfr/SegmentedControl";
import { useEffect, useState } from "react";
import { z } from "zod";

import { ClientOnly } from "@/components/ClientOnly";
import { Box, P } from "@/dsfr";
import { store } from "@/lib/store";
import { OuiNonLabels } from "@/utils/zod";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schemaOui = z.object({
  possedeEspacesExterieursCommuns: z.literal("Oui"),
  espacesExterieursCommuns: z
    .array(z.string({ required_error: "Les espaces extérieurs communs sont obligatoires" }), {
      errorMap: (issue, context) => {
        if (issue.code === "invalid_type") {
          return { message: "Les espaces extérieurs communs sont obligatoires" };
        }
        return { message: context.defaultError };
      },
    })
    .nonempty({ message: "Les espaces extérieurs communs sont obligatoires" }),
});
const schemaNon = z.object({
  possedeEspacesExterieursCommuns: z.literal("Non", {
    errorMap: (issue, context) => {
      if (issue.code === "invalid_literal") {
        return { message: "La question est obligatoire" };
      }
      return { message: context.defaultError };
    },
  }),
});

export const Step5 = () => {
  let initialState: ReturnType<typeof store.get>;

  const [radioState, setRadioState] = useState<(typeof OuiNonLabels)[number] | undefined>();
  // initialState.possedeEspacesExterieursCommuns as (typeof OuiNonLabels)[number] | undefined,

  useEffect(() => {
    initialState = store.get();
    setRadioState(initialState.possedeEspacesExterieursCommuns as (typeof OuiNonLabels)[number]);
  }, []);

  useEffect(() => {
    if (radioState === "Non") {
      (document.getElementsByName("espacesExterieursCommuns") as NodeListOf<HTMLInputElement>).forEach(
        (el: HTMLInputElement) => {
          el.checked = false;
        },
      );
    }
  }, [radioState]);

  console.log("radioState", radioState);

  return (
    <ClientOnly>
      <Box>
        <HeaderFunnel />
        <P>
          Votre bâtiment a-t-il des <strong>espaces extérieurs communs</strong> ?
        </P>

        <WizardForm
          schema={radioState === "Oui" ? schemaOui : schemaNon}
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

              {errors?.possedeEspacesExterieursCommuns?._errors && (
                <p className={fr.cx("fr-message", "fr-message--error", "fr-mt-2w")}>
                  {errors?.possedeEspacesExterieursCommuns?._errors}
                </p>
              )}

              <P className={fr.cx("fr-mt-8v")}>Lesquels ?</P>

              <Checkbox
                legend="Légende pour l’ensemble de champs"
                disabled={radioState === "Oui" ? false : true}
                options={[
                  {
                    label: "Jardin",
                    nativeInputProps: {
                      defaultChecked: initialState?.espacesExterieursCommuns?.includes("jardin"),
                      name: "espacesExterieursCommuns",
                      value: "jardin",
                    },
                  },
                  {
                    label: "Parking extérieur",
                    nativeInputProps: {
                      defaultChecked: initialState?.espacesExterieursCommuns?.includes("parking exterieur"),
                      name: "espacesExterieursCommuns",
                      value: "parking exterieur",
                    },
                  },
                  {
                    label: "Toit terrasse",
                    nativeInputProps: {
                      defaultChecked: initialState?.espacesExterieursCommuns?.includes("toit terrasse"),
                      name: "espacesExterieursCommuns",
                      value: "toit terrasse",
                    },
                  },
                  {
                    label: "Autres",
                    nativeInputProps: {
                      defaultChecked: initialState?.espacesExterieursCommuns?.includes("autres"),
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
    </ClientOnly>
  );
};

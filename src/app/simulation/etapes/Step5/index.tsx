"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { SegmentedControl, type SegmentedControlProps } from "@codegouvfr/react-dsfr/SegmentedControl";
import { useEffect, useState } from "react";
import { z } from "zod";

import { P } from "@/dsfr";
import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";
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
  const [radioState, setRadioState] = useState<(typeof OuiNonLabels)[number] | undefined>();
  const { store } = usePacoupaSessionStorage();

  useEffect(() => {
    setRadioState((store.possedeEspacesExterieursCommuns as (typeof OuiNonLabels)[number]) ?? "Oui");
  }, [store]);

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
    <>
      <HeaderFunnel />
      <P>
        Votre bâtiment a-t-il des <strong>espaces extérieurs communs</strong> ?
      </P>

      <WizardForm
        schema={radioState === "Oui" ? schemaOui : schemaNon}
        render={({ errors, store }) => (
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
              disabled={radioState === "Oui" ? false : true}
              options={[
                {
                  label: "Jardin",
                  nativeInputProps: {
                    defaultChecked: store.espacesExterieursCommuns?.includes("jardin"),
                    name: "espacesExterieursCommuns",
                    value: "jardin",
                  },
                },
                {
                  label: "Parking extérieur",
                  nativeInputProps: {
                    defaultChecked: store.espacesExterieursCommuns?.includes("parking exterieur"),
                    name: "espacesExterieursCommuns",
                    value: "parking exterieur",
                  },
                },
                {
                  label: "Toit terrasse",
                  nativeInputProps: {
                    defaultChecked: store.espacesExterieursCommuns?.includes("toit terrasse"),
                    name: "espacesExterieursCommuns",
                    value: "toit terrasse",
                  },
                },
              ]}
              state={errors?.espacesExterieursCommuns?._errors ? "error" : "default"}
              stateRelatedMessage={errors?.espacesExterieursCommuns?._errors}
            />
          </>
        )}
      />
    </>
  );
};

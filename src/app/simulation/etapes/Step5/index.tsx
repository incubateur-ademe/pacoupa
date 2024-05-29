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
  espacesExterieursCommuns: z.undefined(),
});

export const Step5 = () => {
  const [radioState, setRadioState] = useState<(typeof OuiNonLabels)[number] | undefined>();
  const { store, setStore } = usePacoupaSessionStorage();

  useEffect(() => {
    // On mount, load the value from the store or set it to the Oui value, to display the Oui options.
    setRadioState((store.possedeEspacesExterieursCommuns as (typeof OuiNonLabels)[number]) ?? "Oui");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Clean the checkboxes and the store if the user selects Non.
    if (radioState === "Non") {
      (document.getElementsByName("espacesExterieursCommuns") as NodeListOf<HTMLInputElement>).forEach(
        (el: HTMLInputElement) => {
          el.checked = false;
        },
      );
      setStore({ ...store, espacesExterieursCommuns: undefined });
    }
    // Doesn't depend on store and make a recursive call if present.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioState, setStore]);

  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={radioState === "Oui" ? schemaOui : schemaNon}
        render={({ errors, store }) => (
          <>
            <SegmentedControl
              legend={
                <>
                  Votre bâtiment a-t-il des <strong>espaces extérieurs communs</strong> ?
                </>
              }
              name="possedeEspacesExterieursCommuns"
              aria-required
              aria-invalid={Boolean(errors?.possedeEspacesExterieursCommuns?._errors)}
              aria-describedby="possedeEspacesExterieursCommuns-message"
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

            <p className={fr.cx("fr-mt-2w")} id="possedeEspacesExterieursCommuns-message" aria-live="polite">
              {errors?.possedeEspacesExterieursCommuns?._errors && (
                <span className={fr.cx("fr-message", "fr-message--error", "fr-mt-2w")}>
                  {errors?.possedeEspacesExterieursCommuns?._errors}
                </span>
              )}
            </p>

            <P className={fr.cx("fr-mt-8v")}>Lesquels ?</P>

            <Checkbox
              disabled={radioState !== "Oui"}
              aria-required={radioState === "Oui"}
              aria-invalid={Boolean(errors?.espacesExterieursCommuns?._errors)}
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
              stateRelatedMessage={<div aria-live="polite">{errors?.espacesExterieursCommuns?._errors}</div>}
            />
          </>
        )}
      />
    </>
  );
};

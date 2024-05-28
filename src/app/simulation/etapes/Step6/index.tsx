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
  espacesExterieursPersonnels: z.never(),
});

export const Step6 = () => {
  const [radioState, setRadioState] = useState<(typeof OuiNonLabels)[number] | undefined>();
  const { store, setStore } = usePacoupaSessionStorage();

  useEffect(() => {
    setStore({ ...store, espacesExterieursPersonnels: undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cleaning the potential precedent values is mandatory. It will be submitted back if needed.
  }, []);

  useEffect(() => {
    setRadioState((store.possedeEspacesExterieursPersonnels as (typeof OuiNonLabels)[number]) ?? "Oui");
  }, [store]);

  useEffect(() => {
    if (radioState === "Non") {
      (document.getElementsByName("espacesExterieursPersonnels") as NodeListOf<HTMLInputElement>).forEach(
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
        Votre appartement a-t-il des <strong>espaces extérieurs personnels</strong> ?
      </P>

      <WizardForm
        schema={radioState === "Oui" ? schemaOui : schemaNon}
        render={({ errors, store }) => (
          <>
            <SegmentedControl
              legend=""
              name="possedeEspacesExterieursPersonnels"
              aria-required
              aria-invalid={Boolean(errors?.possedeEspacesExterieursPersonnels?._errors)}
              aria-describedby="possedeEspacesExterieursPersonnels-message"
              segments={
                OuiNonLabels.map(
                  label =>
                    ({
                      label,
                      nativeInputProps: {
                        value: label,
                        checked: radioState === label,
                        onChange: () => setRadioState(label),
                      },
                    }) satisfies SegmentedControlProps.SegmentWithoutIcon,
                ) as unknown as SegmentedControlProps.Segments
              }
            />

            <p className={fr.cx("fr-mt-2w")} id="possedeEspacesExterieursPersonnels-message" aria-live="polite">
              {errors?.possedeEspacesExterieursPersonnels?._errors && (
                <span className={fr.cx("fr-message", "fr-message--error", "fr-mt-2w")}>
                  {errors?.possedeEspacesExterieursPersonnels?._errors}
                </span>
              )}
            </p>

            <P className={fr.cx("fr-mt-8v")}>Lesquels ?</P>

            <Checkbox
              disabled={radioState !== "Oui"}
              aria-required={radioState === "Oui"}
              aria-invalid={Boolean(errors?.espacesExterieursPersonnels?._errors)}
              options={[
                {
                  label: "Balcon",
                  nativeInputProps: {
                    defaultChecked: store.espacesExterieursPersonnels?.includes("balcon"),
                    name: "espacesExterieursPersonnels",
                    value: "balcon",
                  },
                },
                {
                  label: "Toit terrasse",
                  nativeInputProps: {
                    defaultChecked: store.espacesExterieursPersonnels?.includes("toit terrasse"),
                    name: "espacesExterieursPersonnels",
                    value: "toit terrasse",
                  },
                },
              ]}
              state={errors?.espacesExterieursPersonnels?._errors ? "error" : "default"}
              stateRelatedMessage={<div aria-live="polite">{errors?.espacesExterieursPersonnels?._errors}</div>}
            />
          </>
        )}
      />
    </>
  );
};

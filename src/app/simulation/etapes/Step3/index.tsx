"use client";

import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { z } from "zod";

import { Callout } from "@/components/Callout";
import { Text } from "@/dsfr/base/typography";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schema = z.object({
  renovation: z.array(z.string()).optional(),
});

export const Step3 = () => {
  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <>
            <div>
              <Checkbox
                legend={
                  <p>
                    Quels ont été les travaux d’isolation réalisés il y a moins de 15 ans ? <br />
                    <Text variant="xs">Si vous avez un doute, ne cochez pas la case.</Text>
                  </p>
                }
                options={[
                  {
                    label: "Toiture",
                    nativeInputProps: {
                      defaultChecked: store.renovation?.includes("toiture"),
                      name: "renovation",
                      value: "toiture",
                      disabled: store.annee !== undefined && store.annee >= 2000,
                    },
                  },
                  {
                    label: "Murs",
                    nativeInputProps: {
                      defaultChecked: store.renovation?.includes("murs"),
                      name: "renovation",
                      value: "murs",
                      disabled: store.annee !== undefined && store.annee >= 2000,
                    },
                  },
                  {
                    label: "Sol",
                    nativeInputProps: {
                      defaultChecked: store.renovation?.includes("sol"),
                      name: "renovation",
                      value: "sol",
                      disabled: store.annee !== undefined && store.annee >= 2000,
                    },
                  },
                  {
                    label: "Fenêtres",
                    nativeInputProps: {
                      defaultChecked: store.renovation?.includes("fenetres"),
                      name: "renovation",
                      value: "fenetres",
                      disabled: store.annee !== undefined && store.annee >= 2000,
                    },
                  },
                ]}
                state={errors?.renovation?._errors ? "error" : "default"}
                stateRelatedMessage={<div aria-live="polite">{errors?.renovation?._errors}</div>}
              />
            </div>

            <>
              {/* Fix: when the checkbox are disabled, they are not submitted but they should. */}
              {store.annee !== undefined &&
                store.annee >= 2000 &&
                ["fenetres", "sol", "toiture", "murs"].map(value => (
                  <input key={value} type="hidden" name="renovation" value={value} />
                ))}
            </>

            <div>
              <Callout
                type="pacoupa"
                content={
                  store.annee !== undefined && store.annee >= 2000 ? (
                    <>Votre bâtiment étant récent, nous considérons qu’il est déjà correctement isolé.</>
                  ) : (
                    <>
                      Pour vous recommander des chauffages plus écologiques et économiques, nous vous proposerons
                      également des gestes d'isolation adaptés.
                    </>
                  )
                }
              />
            </div>
          </>
        )}
      />
    </>
  );
};

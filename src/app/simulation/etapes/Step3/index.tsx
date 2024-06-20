"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { z } from "zod";

import { Box } from "@/dsfr";
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
          <Box>
            <Checkbox
              legend={
                <p>
                  Sélectionnez les isolations qui ont été faites il y a moins de 15 ans.
                  <br />
                  <Text className={fr.cx("fr-text--xs")}>Si vous avez un doute, ne cochez pas la case.</Text>
                </p>
              }
              options={[
                {
                  label: "Toiture",
                  nativeInputProps: {
                    defaultChecked: store.renovation?.includes("toiture"),
                    name: "renovation",
                    value: "toiture",
                  },
                },
                {
                  label: "Murs",
                  nativeInputProps: {
                    defaultChecked: store.renovation?.includes("murs"),
                    name: "renovation",
                    value: "murs",
                  },
                },
                {
                  label: "Sol",
                  nativeInputProps: {
                    defaultChecked: store.renovation?.includes("sol"),
                    name: "renovation",
                    value: "sol",
                  },
                },
                {
                  label: "Fenêtres",
                  nativeInputProps: {
                    defaultChecked: store.renovation?.includes("fenetres"),
                    name: "renovation",
                    value: "fenetres",
                  },
                },
              ]}
              state={errors?.renovation?._errors ? "error" : "default"}
              stateRelatedMessage={<div aria-live="polite">{errors?.renovation?._errors}</div>}
            />
          </Box>
        )}
      />
    </>
  );
};

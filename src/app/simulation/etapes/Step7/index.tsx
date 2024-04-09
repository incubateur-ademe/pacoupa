"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { useStore } from "@/lib/client/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";
import { GroupeImage } from "./GroupeImage";
import { PersonneImage } from "./PersonneImage";

const required_error = "Le type de chauffage est obligatoire";

const schema = z.object({
  typeCH: z
    .string({
      required_error,
    })
    .min(1, required_error),
});

export const Step7 = () => {
  const [initialState, sessionStorageOK] = useStore();

  return (
    <>
      {sessionStorageOK && (
        <Box>
          <HeaderFunnel />
          <P>S’agit-il d’un chauffage...</P>

          <WizardForm
            schema={schema}
            render={({ errors }) => (
              <>
                <Box>
                  <RadioButtons
                    name="typeCH"
                    options={[
                      {
                        illustration: <PersonneImage />,
                        label: "Individuel",
                        nativeInputProps: {
                          defaultChecked: initialState?.typeCH === "individuel",
                          value: "individuel",
                        },
                      },
                      {
                        illustration: <GroupeImage />,
                        label: "Collectif",
                        nativeInputProps: {
                          defaultChecked: initialState?.typeCH === "collectif",
                          value: "collectif",
                        },
                      },
                    ]}
                    state={errors?.typeCH?._errors ? "error" : "default"}
                    stateRelatedMessage={errors?.typeCH?._errors}
                  />
                </Box>
              </>
            )}
          />
        </Box>
      )}
    </>
  );
};

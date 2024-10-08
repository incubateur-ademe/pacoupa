import { Base64 } from "js-base64";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import { type z, type ZodFormattedError } from "zod";

import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { createObjectFromFormData } from "@/lib/form-data";

import { ButtonsFunnel } from "./ButtonsFunnel";

export const ETAPE_ANNEE = 1;
export const ETAPE_ISOLATION = 2;
export const ETAPE_NB_LOGEMENTS = 3;

export type HandleFormResult =
  | {
      errors: ZodFormattedError<{ [x: string]: unknown }, string>;
      success: false;
    }
  | {
      success: true;
    };

type Props = {
  render: ({
    errors,
    store,
    resetStore,
  }: {
    errors:
      | z.ZodFormattedError<
          {
            [x: string]: unknown;
          },
          string
        >
      | undefined;
    resetStore: () => void;
    store: Partial<InformationBatiment>;
  }) => JSX.Element;
  schema: z.AnyZodObject;
};

export const WizardForm = ({ schema, render }: Props) => {
  const { nextStep, isLastStep, activeStep } = useWizard();
  const [errors, setErrors] = useState<ZodFormattedError<{ [x: string]: unknown }, string>>();
  const router = useRouter();
  const { store, setStore, resetStore } = usePacoupaSessionStorage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * Store the FormData in the session storage or return an error if the form is invalid.
   *
   * @param schema zod schema for the current form
   * @param formAction function to execute if the form is valid
   */
  const handleForm = (schema: z.AnyZodObject) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const validation = schema.safeParse(createObjectFromFormData(schema)(formData));

    // show data in formData
    // for (const [key, value] of formData.entries()) {
    //   console.log(`key ${key}: ${JSON.stringify(value)}`);
    // }

    if (validation.success) {
      const nextStore = { ...store, ...validation.data } as InformationBatiment;

      if (activeStep === ETAPE_ANNEE) {
        if (validation.data.annee !== undefined && validation.data.annee >= 2000) {
          nextStore.renovation = ["fenetres", "sol", "toiture", "murs"] satisfies InformationBatiment["renovation"];
        }
      }

      setStore(nextStore);

      /* navigation exceptions */
      if (isLastStep) {
        const encoded = Base64.encode(JSON.stringify(nextStore));
        return router.push(`/simulation/resultat?hash=${encoded}`);
      }

      nextStep().catch(() => {
        console.error("erreur dans la navigation");
      });
    } else {
      console.error("error", validation.error);
      setErrors(validation.error.format());
    }
  };

  return (
    <>
      <form onSubmit={handleForm(schema)} noValidate>
        {render({ errors, store, resetStore })}

        <ButtonsFunnel />
      </form>
    </>
  );
};

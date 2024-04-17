import { Base64 } from "js-base64";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import { z, type ZodFormattedError } from "zod";

import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";

import { type SimulationSchema } from "../schema";
import { ButtonsFunnel } from "./ButtonsFunnel";

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
    store: Partial<SimulationSchema>;
  }) => JSX.Element;
  schema: z.AnyZodObject;
};

const createJSONFromFormData = (data: FormData, zodSchema: z.AnyZodObject) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const keys = Object.keys(zodSchema.shape) as unknown as Array<keyof z.infer<typeof zodSchema>>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const arrayKeys = keys.filter(key => zodSchema.shape[key] instanceof z.ZodArray);

  const values = Object.fromEntries(
    Array.from(data.keys()).map(key => [key, arrayKeys.includes(key) ? data.getAll(key) : data.get(key)]),
  );

  console.debug("Debug values createJSONFromFormData", JSON.stringify(values));

  return values;
};

export const WizardForm = ({ schema, render }: Props) => {
  const { nextStep, isLastStep } = useWizard();
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
    const validation = schema.safeParse(createJSONFromFormData(formData, schema));

    if (validation.success) {
      const nextStore = { ...store, ...validation.data } as SimulationSchema;
      setStore(nextStore);

      if (isLastStep) {
        const encoded = Base64.encode(JSON.stringify(nextStore));
        return router.push(`/simulation/resultat?hash=${encoded}`);
      }

      nextStep().catch(() => {
        console.error("erreur dans la navigation");
      });
    } else {
      console.log("error", validation.error);
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

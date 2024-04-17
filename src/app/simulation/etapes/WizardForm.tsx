import { Base64 } from "js-base64";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import { z, type ZodFormattedError } from "zod";

import { store } from "@/lib/client/store";

import { ButtonsFunnel } from "./ButtonsFunnel";

export type HandleFormResult =
  | {
      errors: ZodFormattedError<{ [x: string]: unknown }, string>;
      success: false;
    }
  | {
      success: true;
    };

/**
 * Store the FormData in the session storage or return an error if the form is invalid.
 *
 * @param schema zod schema for the current form
 * @param formAction function to execute if the form is valid
 */
export const handleForm =
  (schema: z.AnyZodObject, formAction: (handleResult: HandleFormResult) => void) =>
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const keys = Object.keys(schema.shape) as unknown as Array<keyof z.infer<typeof schema>>;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const arrayKeys = keys.filter(key => schema.shape[key] instanceof z.ZodArray);

    const values = Object.fromEntries(
      Array.from(data.keys()).map(key => [key, arrayKeys.includes(key) ? data.getAll(key) : data.get(key)]),
    );

    console.debug("Debug values", JSON.stringify(values));

    const validation = schema.safeParse(values);

    let result: HandleFormResult;

    if (validation.success) {
      store.update(validation.data);
      result = { success: true };
    } else {
      console.log("error", validation.error);

      result = { success: false, errors: validation.error.format() };
    }

    formAction(result);
  };

type Props = {
  render: ({
    errors,
  }: {
    errors:
      | z.ZodFormattedError<
          {
            [x: string]: unknown;
          },
          string
        >
      | undefined;
  }) => JSX.Element;
  schema: z.AnyZodObject;
};

export const WizardForm = ({ schema, render }: Props) => {
  const { nextStep, isLastStep } = useWizard();
  const [errors, setErrors] = useState<ZodFormattedError<{ [x: string]: unknown }, string>>();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formAction = useCallback(
    (result: HandleFormResult) => {
      if (result.success) {
        const encoded = Base64.encode(JSON.stringify(store.get()));

        if (isLastStep) {
          return router.push(`/simulation/resultat?hash=${encoded}`);
        }

        nextStep().catch(() => {
          console.error("erreur dans la navigation");
        });
      } else {
        console.log("error", result.errors);
        setErrors(result.errors);
      }
    },
    [nextStep, setErrors, isLastStep, router],
  );

  return (
    <>
      <form onSubmit={handleForm(schema, formAction)}>
        {render({ errors })}

        <ButtonsFunnel />
      </form>
    </>
  );
};

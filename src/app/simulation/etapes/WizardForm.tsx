import { useCallback, useState } from "react";
import { useWizard } from "react-use-wizard";
import { z, type ZodFormattedError } from "zod";

import { store } from "@/lib/store";

import { ButtonsFunnel } from "./FooterFunnel";

export type HandleFormResult =
  | {
      errors: ZodFormattedError<{ [x: string]: unknown }, string>;
      success: false;
    }
  | {
      success: true;
    };

export const handleForm =
  (schema: z.AnyZodObject, formAction: (handleResult: HandleFormResult) => void) =>
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const keys = Object.keys(schema.shape) as unknown as Array<keyof z.infer<typeof schema>>;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const arrayKeys = keys.filter(key => schema.shape[key] instanceof z.ZodArray);

    // const values = Object.fromEntries(data);
    const values = Object.fromEntries(
      Array.from(data.keys()).map(key => [key, arrayKeys.includes(key) ? data.getAll(key) : data.get(key)]),
    );

    console.debug("Debug values", JSON.stringify(values));
    // console.debug("Debug keys which are arrays", arrayKeys); // Logs all keys of the schema that are arrays

    const validation = schema.safeParse(values);

    let result: HandleFormResult;

    if (validation.success) {
      store.update(validation.data);
      result = { success: true };
    } else {
      console.log("error", validation.error);

      // result = { success: false, errors: { [validation.error.errors[0].path]: validation.error.errors[0].message } };
      result = { success: false, errors: validation.error.format() };
    }

    formAction(result);
  };

type Props = {
  // formAction: (handleResult: HandleFormResult) => void;
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
  const { nextStep } = useWizard();
  const [errors, setErrors] = useState<ZodFormattedError<{ [x: string]: unknown }, string>>();

  const formAction = useCallback(
    (result: HandleFormResult) => {
      if (result.success) {
        nextStep().catch(() => {
          console.log("erreur dans la navigation");
        });
      } else {
        console.log("error", result.errors);
        setErrors(result.errors);
      }
    },
    [nextStep, setErrors],
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

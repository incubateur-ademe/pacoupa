import { type z, type ZodFormattedError } from "zod";

import { store } from "./store";

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
    const values = Object.fromEntries(data);

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

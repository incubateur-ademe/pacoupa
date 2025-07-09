/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

/**
 * We use zodSchema to know if a field is an array or not. If so, we use getAll to get all the values.
 *
 * This way, we can freely transform a FormData into an object.
 */
export const createObjectFromFormData = (zodSchema: z.AnyZodObject) => (data: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const keys = Object.keys(zodSchema.shape);

  // keys which are array(). We will use getAll to get all the values.
  const arrayKeys = keys.filter(key =>
    zodSchema.shape[key] instanceof z.ZodOptional || zodSchema.shape[key] instanceof z.ZodNullable
      ? zodSchema.shape[key].unwrap() instanceof z.ZodArray
      : zodSchema.shape[key] instanceof z.ZodArray,
  );

  // keys which are array().optional(). We need this to reset array fields which was filled and then emptied.
  const optionalArrayKeys = keys.filter(key => zodSchema.shape[key] instanceof z.ZodOptional);

  const values = Object.fromEntries(
    Array.from([...data.keys(), ...optionalArrayKeys]).map(key => [
      key,
      arrayKeys.includes(key) ? data.getAll(key) : data.get(key),
    ]),
  );

  console.debug({ keys, arrayKeys, optionalArrayKeys, values });

  return values;
};

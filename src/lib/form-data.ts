import { z } from "zod";

export const createObjectFromFormData = (zodSchema: z.AnyZodObject) => (data: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const keys = Object.keys(zodSchema.shape) as unknown as Array<keyof z.infer<typeof zodSchema>>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const arrayKeys = keys.filter(key => zodSchema.shape[key] instanceof z.ZodArray);

  const values = Object.fromEntries(
    Array.from(data.keys()).map(key => [key, arrayKeys.includes(key) ? data.getAll(key) : data.get(key)]),
  );

  return values;
};

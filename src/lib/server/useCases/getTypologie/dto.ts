import { z } from "zod";

export const GetTypologieDTOSchema = z.object({
  annee: z.coerce.number().positive(),
  nbLogements: z.coerce.number().positive(),
});

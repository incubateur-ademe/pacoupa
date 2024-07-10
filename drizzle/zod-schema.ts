import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { bddCout, bddEnergie, criteres, typologies } from "./schema";

export const criteresBatimentSchema = createSelectSchema(criteres);

export type CriteresBatiment = z.infer<typeof criteresBatimentSchema>;

export const bddEnergieSchema = createSelectSchema(bddEnergie);

export type BddEnergie = z.infer<typeof bddEnergieSchema>;

export const bddEnergieCoutSchema = createSelectSchema(bddCout);

export type BddCout = z.infer<typeof bddEnergieCoutSchema>;

export const typologiesZodSchema = createSelectSchema(typologies);

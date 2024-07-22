import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { bddEco, bddEnergie, criteres, typologies } from "./schema";

export const criteresBatimentSchema = createSelectSchema(criteres);

export type CriteresBatiment = z.infer<typeof criteresBatimentSchema>;

export const bddEnergieSchema = createSelectSchema(bddEnergie);

export type BddEnergie = z.infer<typeof bddEnergieSchema>;

export const bddEcoSchema = createSelectSchema(bddEco);

export type BddEco = z.infer<typeof bddEcoSchema>;

export const typologiesZodSchema = createSelectSchema(typologies);

export type Typologies = z.infer<typeof typologiesZodSchema>;

import { relations } from "drizzle-orm/relations";

import { criteres, solutions, solutionsParCriteres } from "./schema";

export const solutionsParCriteresRelations = relations(solutionsParCriteres, ({ one }) => ({
  solution: one(solutions, {
    fields: [solutionsParCriteres.solutionsId],
    references: [solutions.id],
  }),
  critere: one(criteres, {
    fields: [solutionsParCriteres.criteresId],
    references: [criteres.id],
  }),
}));

export const solutionsRelations = relations(solutions, ({ many }) => ({
  solutionsParCriteres: many(solutionsParCriteres),
}));

export const criteresRelations = relations(criteres, ({ many }) => ({
  solutionsParCriteres: many(solutionsParCriteres),
}));

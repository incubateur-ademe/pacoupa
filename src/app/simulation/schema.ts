import { z } from "zod";

export const simulationSchema = z.object({
  adresse: z.string().min(1, "L'adresse est obligatoire"),
  annee: z.enum(["pre-1945", "1946-1974", "1975-1989", "post-1990"]),
  renovation: z.enum(["aucune rénovation", "rénovations partielles", "rénovation globale"]),
  nbLogements: z.coerce
    .number({
      invalid_type_error: "Le nombre de logements doit être un nombre",
    })
    .min(1, "Le nombre de logements est obligatoire et supérieur à zéro"),
  typeCH: z.enum(["individuel", "collectif"]),
  energieChauffage: z.enum(["fioul", "gaz", "electricite"]),
  emetteur: z.enum(["radiateurs", "plancher chauffant"]),
  typeECS: z.enum(["individuel", "collectif"]),
  energieECS: z.enum(["fioul", "gaz", "ballon electrique"]),
  espacesExterieursCommuns: z.array(z.enum(["jardin", "parking exterieur", "toit terrasse", "autres"])).optional(),
  espacesExterieursPersonnels: z.array(z.enum(["balcon", "toit terrasse", "autres"])).optional(),
});

export type SimulationSchema = z.infer<typeof simulationSchema>;

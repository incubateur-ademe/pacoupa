import { z } from "zod";

import { OuiNonSchema } from "@/utils/zod";

const currentYear = new Date().getFullYear();

export const informationBatimentSchema = z
  .object({
    adresse: z.string().min(1, "L'adresse est obligatoire"),
    annee: z.coerce
      .number({
        invalid_type_error: "L'année doit être un nombre entier",
      })
      .int()
      .min(1, "L'année doit être supérieure à zéro")
      .max(currentYear, "L'année doit être inférieure ou égale à l'année en cours"),
    renovation: z.array(z.enum(["fenetres", "sol", "toiture", "murs"])).optional(),
    nbLogements: z.coerce
      .number({
        invalid_type_error: "Le nombre de logements doit être un nombre",
      })
      .min(1, "Le nombre de logements est obligatoire et supérieur à zéro"),
    typeCH: z.enum(["individuel", "collectif"]),
    energieCH: z.enum(["fioul", "gaz", "electricite"]),
    emetteur: z.enum(["radiateurs", "plancher chauffant"]),
    typeECS: z.enum(["individuel", "collectif"]),
    energieECS: z.enum([
      "fioul",
      "gaz",
      "ballon electrique",
      // on accepte "electricite" parce que y'a une difficulté côté coach copro, qui ne distingue pas dans sa DB les champs energieECS et energieCH
      // à vrai dire, l'erreur est plutôt côté pacoupa d'avoir mis dans cette enum "ballon electrique" au lieu de "electricite"
      "electricite",
    ]),
    possedeEspacesExterieursCommuns: OuiNonSchema.optional(),
    possedeEspacesExterieursPersonnels: OuiNonSchema.optional(),
    espacesExterieursCommuns: z.array(z.enum(["jardin", "parking exterieur", "toit terrasse"])).optional(),
    espacesExterieursPersonnels: z.array(z.enum(["balcon", "toit terrasse"])).optional(),
  })
  .strict();

export type InformationBatiment = z.infer<typeof informationBatimentSchema>;

export const estGlobalementRenove = (informationBatiment: InformationBatiment) =>
  informationBatiment.renovation?.length === 4 || informationBatiment.annee >= 2000;

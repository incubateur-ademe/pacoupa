import { readFileSync } from "fs";
import { z } from "zod";
import { $ } from "zx";

console.log("dans check_solutions.mts --------------------");

await $`sqlite-utils memory ${process.env.ASSETS_DIR}/bdd_energie_clean.csv "select * from bdd_energie_clean" > bdd_energie.json`;

const schema = z.array(
  z.object({
    zone_climatique: z.string(),
    // typologie: z.enum(["Petit collectif - Avant 1948", "Moyen collectif - Avant 1948", "Grand collectif - Avant 1948", "Petit collectif (1948-1974)", "Moyen-grand collectif (1948 -1974)", "Grand collectif (1948-1974)", "Petit collectif (1975-1981)", "Moyen-grand collectif (1975-1981)", "Grand collectif (1975-1981)", "Petit collectif (1982-1989)", "Moyen-grand collectif (1982-1989)", "Grand collectif (1982-1989)", "Petit collectif (1990-2000)", "Moyen-grand collectif (1990-2000)", "Grand collectif (1990-2000)", "Petit collectif (2001-2005)", "Moyen-grand collectif (2001- 2005)", "Petit collectif (2006-2012)", "Moyen-grand collectif (2006- 2012)", "Petit collectif (après 2012)", "Moyen-grand collectif (après 2012)"]),
    typologie: z.enum([
      "Petit collectif - Avant 1948",
      "Moyen collectif - Avant 1948",
      "Grand collectif - Avant 1948",
      "Petit collectif (1948-1974)",
      "Moyen-grand collectif (1948 -1974)",
      "Grand collectif (1948-1974)",
      "Petit collectif (1975-1981)",
      "Moyen-grand collectif (1975-1981)",
      "Grand collectif (1975-1981)",
      "Petit collectif (1982-1989)",
      "Moyen-grand collectif (1982-1989)",
      "Grand collectif (1982-1989)",
      "Petit collectif (1990-2000)",
      "Moyen-grand collectif (1990-2000)",
      "Grand collectif (1990-2000)",
      "Petit collectif (2001-2005)",
      "Moyen-grand collectif (2001- 2005)",
      "Petit collectif (2006-2012)",
      "Moyen-grand collectif (2006- 2012)",
      "Petit collectif (après 2012)",
      "Moyen-grand collectif (après 2012)",
    ]),
    scenario_renovation_enveloppe: z.string(),
    etat_isolation_menuiseries: z.enum(["Pas isolé", "Isolé"]),
    etat_isolation_plancher_bas: z.enum(["Pas isolé", "Isolé"]),
    etat_isolation_plancher_haut: z.enum(["Pas isolé", "Isolé"]),
    etat_isolation_murs: z.enum(["Pas isolé", "Isolé"]),
    etat_isolation_menuiseries_apres_scenario_renovation_enveloppe: z.enum(["Pas isolé", "Isolé"]),
    etat_isolation_plancher_bas_apres_scenario_renovation_enveloppe: z.enum(["Pas isolé", "Isolé"]),
    etat_isolation_plancher_haut_apres_scenario_renovation_enveloppe: z.enum(["Pas isolé", "Isolé"]),
    etat_isolation_murs_apres_scenario_renovation_enveloppe: z.enum(["Pas isolé", "Isolé"]),
    type_CH: z.enum(["ELEC", "FIOUL", "GAZ"]),
    type_ECS: z.enum(["ELEC", "FIOUL", "GAZ"]),
    CH: z.enum(["COL", "IND"]),
    ECS: z.enum(["COL", "IND"]),
    scenario_renovation_systeme: z.enum([
      "S0",
      "Chaudière gaz à condensation",
      "ECS seule : PAC Air / Eau",
      "ECS seule Hybride : PAC + chaudière",
      "CH + ECS : PAC Air / Eau",
      "CH + ECS Hybride : PAC + Chaudière",
      "CH seul : PAC Air / Eau",
      "CH seul Hybride : PAC + Chaudière",
    ]),
    Annexe: z.string().optional(),
    CEP: z.number().int().positive(),
    GES: z.number().int().positive(),
    DPE: z.enum(["A", "B", "C", "D", "E", "F", "G"]),
    gain_CEP: z.string().optional(),
  }),
);

// parse the json file with the schema
const rawData = readFileSync("bdd_energie.json");

// console.log("rawData", rawData.toString());

const result = schema.safeParse(JSON.parse(rawData.toString()));

if (result.success) {
  console.log("Success");
  await $`rm bdd_energie.json`;
} else {
  console.log("Error", result.error);
}

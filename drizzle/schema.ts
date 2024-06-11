import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { enumDPE } from "@/lib/common/domain/values/DPE";
import { enumEmetteur } from "@/lib/common/domain/values/Emetteur";
import { enumScenarioRenovationEnveloppe } from "@/lib/common/domain/values/ScenarioRenovationEnveloppe";
import { enumScenarioRenovationSysteme } from "@/lib/common/domain/values/ScenarioRenovationSysteme";
import { enumFamille } from "@/lib/common/domain/values/SolutionFamille";
import { enumIsolation } from "@/lib/common/domain/values/SolutionIsolation";
import { enumNiveauRenovation } from "@/lib/common/domain/values/SolutionNiveauRenovation";
import { enumNote } from "@/lib/common/domain/values/SolutionNote";
import { enumType, enumTypeWithoutMix } from "@/lib/common/domain/values/SolutionTypes";
import { enumUsage } from "@/lib/common/domain/values/SolutionUsage";
import { enumTypeCH } from "@/lib/common/domain/values/TypeCH";
import { enumTypeECS } from "@/lib/common/domain/values/TypeECS";
import { enumTypeSysteme } from "@/lib/common/domain/values/TypeSysteme";
import { enumTypologie } from "@/lib/common/domain/values/Typologie";
import { enumZoneClimatique } from "@/lib/common/domain/values/ZoneClimatique";

export const solutions = sqliteTable("solutions", {
  id: text("id").primaryKey(),
  nom: text("nom").notNull(),
  familleSolution: text("famille_solution", { enum: enumFamille }).notNull(),
  type: text("type", { enum: enumType }).notNull(),
  typeSysteme: text("type_systeme", { enum: enumTypeSysteme }).notNull(),
  usageCh: text("usage_CH", { enum: enumUsage }).notNull(),
  usageEcs: text("usage_ECS", { enum: enumUsage }).notNull(),
  usageFr: text("usage_FR", { enum: enumUsage }).notNull(),
  noteImpactVisuel: text("note_impact_visuel", { enum: enumNote }).notNull(),
  noteImpactSonore: text("note_impact_sonore", { enum: enumNote }).notNull(),
  noteImpactEspaceExterieur: text("note_impact_espace_exterieur", { enum: enumNote }).notNull(),
  noteEnvironnemental: text("note_environnemental", { enum: enumNote }).notNull(),
  noteMaturite: text("note_maturite", { enum: enumNote }).notNull(),
  numAfpac: text("num_AFPAC"),
  emprisePacExterieur: text("emprise_PAC_exterieur"),
  localTechnique: text("local_technique"),
  empriseLogement: text("emprise_logement"),
  structure: text("structure"),
  acoustique: text("acoustique"),
  reseauxHydrauliques: text("reseaux_hydrauliques"),
  plu: text("PLU"),
  raccordementElectrique: text("raccordement_electrique"),
  impactVisuel: text("impact_visuel"),
  descriptionSolution: text("description_solution"),
  descriptionSolutionPropositionPouget: text("description_solution_proposition Pouget"),
  commentaireApp: text("commentaire_app"),
  commentairePouget: text("commentaire_pouget"),
});

export const criteres = sqliteTable(
  "criteres",
  {
    id: integer("id").primaryKey(),
    ch: text("CH"),
    ecs: text("ECS"),
    emetteur: text("emetteur"),
    espaceExterieurPersonnel: text("espace_exterieur_personnel"),
    envContraint: text("env_contraint"),
    toitureTerrasse: text("toiture_terrasse"),
    temperature: text("temperature"),
    nbLgts: text("nb_lgts"),
    niveauRenovation: text("niveau_renovation"),
  },
  table => {
    return {
      idxCriteresChEcsEmetteurEspaceExterieurPersonnelEnvContraintToitureTerrasseTemperatureNbLgtsNiveauRenovation:
        uniqueIndex(
          "idx_criteres_CH_ECS_emetteur_espace_exterieur_personnel_env_contraint_toiture_terrasse_temperature_nb_lgts_niveau_renovation",
        ).on(
          table.ch,
          table.ecs,
          table.emetteur,
          table.espaceExterieurPersonnel,
          table.envContraint,
          table.toitureTerrasse,
          table.temperature,
          table.nbLgts,
          table.niveauRenovation,
        ),
    };
  },
);

export const solutionsParCriteres = sqliteTable("solutions_par_criteres", {
  criteresId: integer("criteres_id").references(() => criteres.id),
  solutionsId: text("solutions_id").references(() => solutions.id),
  ordreSolution: integer("ordre_solution"),
  noteDifficulte: text("note_difficulte", { enum: enumNote }).notNull(),
  noteImpactTravauxColl: text("note_impact_travaux_coll", { enum: enumNote }).notNull(),
  noteImpactTravauxIndiv: text("note_impact_travaux_indiv", { enum: enumNote }).notNull(),
  noteCout: text("note_cout", { enum: enumNote }).notNull(),
  typeSolution: text("type_solution"),
});

export const bddEnergie = sqliteTable("bdd_energie", {
  id: integer("id").primaryKey(),
  zoneClimatique: text("zone_climatique", { enum: enumZoneClimatique }).notNull(),
  typologie: text("typologie", { enum: enumTypologie }).notNull(),
  etatIsolationMenuiseries: text("etat_isolation_menuiseries", { enum: enumIsolation }).notNull(),
  etatIsolationPlancherBas: text("etat_isolation_plancher_bas", { enum: enumIsolation }).notNull(),
  etatIsolationPlancherHaut: text("etat_isolation_plancher_haut", { enum: enumIsolation }).notNull(),
  etatIsolationMurs: text("etat_isolation_murs", { enum: enumIsolation }).notNull(),
  scenarioRenovationEnveloppe: text("scenario_renovation_enveloppe", {
    enum: enumScenarioRenovationEnveloppe,
  }).notNull(),
  etatIsolationMenuiseriesApresScénarioRenovationEnveloppe: text(
    "etat_isolation_menuiseries_apres_scénario_renovation_enveloppe",
    { enum: enumIsolation },
  ).notNull(),
  etatIsolationPlancherBasApresScénarioRenovationEnveloppe: text(
    "etat_isolation_plancher_bas_apres_scénario_renovation_enveloppe",
    { enum: enumIsolation },
  ).notNull(),
  etatIsolationPlancherHautApresScénarioRenovationEnveloppe: text(
    "etat_isolation_plancher_haut_apres_scénario_renovation_enveloppe",
    { enum: enumIsolation },
  ).notNull(),
  etatIsolationMursApresScénarioRenovationEnveloppe: text("etat_isolation_murs_apres_scénario_renovation_enveloppe", {
    enum: enumIsolation,
  }).notNull(),
  typeCh: text("type_CH", { enum: enumTypeCH }),
  typeEcs: text("type_ECS", { enum: enumTypeECS }),
  ch: text("CH", { enum: enumTypeWithoutMix }),
  ecs: text("ECS", { enum: enumTypeWithoutMix }),
  emetteur: text("emetteur", { enum: enumEmetteur }).notNull(),
  scenarioRenovationSysteme: text("scenario_renovation_systeme", { enum: enumScenarioRenovationSysteme }).notNull(),
  usageCh: text("usage_CH", { enum: enumUsage }).notNull(),
  usageEcs: text("usage_ECS", { enum: enumUsage }).notNull(),
  cep: integer("CEP"),
  ges: integer("GES"),
  dpe: text("DPE", { enum: enumDPE }).notNull(),
  gainCep: text("gain_CEP"),
});

export const bddEnergieSchema = createSelectSchema(bddEnergie);

export type BddEnergie = z.infer<typeof bddEnergieSchema>;

export const typologies = sqliteTable("typologies", {
  id: integer("id").primaryKey(),
  nom: text("nom", { enum: enumTypologie }).notNull(),
  minPeriode: integer("min_periode"),
  maxPeriode: integer("max_periode"),
  minLogements: integer("min_logements"),
  maxLogements: integer("max_logements"),
  niveauRenovation: text("niveau_renovation", { enum: enumNiveauRenovation }),
  surfaceHabitable: integer("surface_habitable").notNull(),
  nbLogements: integer("nb_logements").notNull(),
  etatIsolationMenuiseries: text("etat_isolation_menuiseries", { enum: enumIsolation }).notNull(),
  surfaceMenuiseries: integer("surface_menuiseries").notNull(),
  etatIsolationPlancherBas: text("etat_isolation_plancher_bas", { enum: enumIsolation }).notNull(),
  surfacePlancherBas: integer("surface_plancher_bas").notNull(),
  etatIsolationPlancherHaut: text("etat_isolation_plancher_haut", { enum: enumIsolation }).notNull(),
  surfacePlancherHaut: integer("surface_plancher_haut").notNull(),
  etatIsolationMurs: text("etat_isolation_murs", { enum: enumIsolation }).notNull(),
  surfaceMurs: integer("surface_murs").notNull(),
});

export const typologiesZodSchema = createSelectSchema(typologies);

import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";

import {
  enumDPE,
  enumEmetteurs,
  enumFamilles,
  enumIsolation,
  enumNiveauxRenovation,
  enumNotes,
  enumScenarioRenovationEnveloppe,
  enumScenarioRenovationSysteme,
  enumTypeCH,
  enumTypeECS,
  enumTypes,
  enumTypesWithoutMix,
  enumTypeSystemes,
  enumTypologies,
  enumUsages,
  enumZonesClimatiques,
} from "@/lib/enums";

export const solutions = sqliteTable("solutions", {
  id: text("id").primaryKey(),
  nom: text("nom").notNull(),
  familleSolution: text("famille_solution", { enum: enumFamilles }).notNull(),
  type: text("type", { enum: enumTypes }).notNull(),
  typeSysteme: text("type_systeme", { enum: enumTypeSystemes }).notNull(),
  usageCh: text("usage_CH", { enum: enumUsages }).notNull(),
  usageEcs: text("usage_ECS", { enum: enumUsages }).notNull(),
  usageFr: text("usage_FR", { enum: enumUsages }).notNull(),
  noteImpactVisuel: text("note_impact_visuel", { enum: enumNotes }).notNull(),
  noteImpactSonore: text("note_impact_sonore", { enum: enumNotes }).notNull(),
  noteImpactEspaceExterieur: text("note_impact_espace_exterieur", { enum: enumNotes }).notNull(),
  noteEnvironnemental: text("note_environnemental", { enum: enumNotes }).notNull(),
  noteMaturite: text("note_maturite", { enum: enumNotes }).notNull(),
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
  noteDifficulte: text("note_difficulte", { enum: enumNotes }).notNull(),
  noteImpactTravauxColl: text("note_impact_travaux_coll", { enum: enumNotes }).notNull(),
  noteImpactTravauxIndiv: text("note_impact_travaux_indiv", { enum: enumNotes }).notNull(),
  noteCout: text("note_cout", { enum: enumNotes }).notNull(),
  typeSolution: text("type_solution"),
});

export const bddEnergie = sqliteTable("bdd_energie", {
  id: integer("id").primaryKey(),
  zoneClimatique: text("zone_climatique", { enum: enumZonesClimatiques }).notNull(),
  typologie: text("typologie", { enum: enumTypologies }).notNull(),
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
  ch: text("CH", { enum: enumTypesWithoutMix }),
  ecs: text("ECS", { enum: enumTypesWithoutMix }),
  emetteur: text("emetteur", { enum: enumEmetteurs }).notNull(),
  scenarioRenovationSysteme: text("scenario_renovation_systeme", { enum: enumScenarioRenovationSysteme }).notNull(),
  usageCh: text("usage_CH", { enum: enumUsages }).notNull(),
  usageEcs: text("usage_ECS", { enum: enumUsages }).notNull(),
  cep: integer("CEP"),
  ges: integer("GES"),
  dpe: text("DPE", { enum: enumDPE }).notNull(),
  gainCep: text("gain_CEP"),
});

export const typologies = sqliteTable("typologies", {
  id: integer("id").primaryKey(),
  nom: text("nom", { enum: enumTypologies }).notNull(),
  minPeriode: integer("min_periode"),
  maxPeriode: integer("max_periode"),
  minLogements: integer("min_logements"),
  maxLogements: integer("max_logements"),
  niveauRenovation: text("niveau_renovation", { enum: enumNiveauxRenovation }),
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

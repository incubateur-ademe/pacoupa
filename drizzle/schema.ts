import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";

import { enumIsolation, enumNiveauxRenovation, enumTypologies } from "@/lib/enums";

import { drizzleEnumFamilles, drizzleEnumNotes, drizzleEnumTypes, drizzleEnumUsages } from "./helper";

export const solutions = sqliteTable("solutions", {
  id: text("id").primaryKey(),
  nom: text("nom").notNull(),
  familleSolution: text("famille_solution", drizzleEnumFamilles).notNull(),
  type: text("type", drizzleEnumTypes).notNull(),
  usageCh: text("usage_CH", drizzleEnumUsages).notNull(),
  usageEcs: text("usage_ECS", drizzleEnumUsages).notNull(),
  usageFr: text("usage_FR", drizzleEnumUsages).notNull(),
  noteImpactVisuel: text("note_impact_visuel", drizzleEnumNotes).notNull(),
  noteImpactSonore: text("note_impact_sonore", drizzleEnumNotes).notNull(),
  noteImpactEspaceExterieur: text("note_impact_espace_exterieur", drizzleEnumNotes).notNull(),
  noteEnvironnemental: text("note_environnemental", drizzleEnumNotes).notNull(),
  noteMaturite: text("note_maturite", drizzleEnumNotes).notNull(),
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
  noteDifficulte: text("note_difficulte", drizzleEnumNotes).notNull(),
  noteImpactTravauxColl: text("note_impact_travaux_coll", drizzleEnumNotes).notNull(),
  noteImpactTravauxIndiv: text("note_impact_travaux_indiv", drizzleEnumNotes).notNull(),
  noteCout: text("note_cout", drizzleEnumNotes).notNull(),
  typeSolution: text("type_solution"),
});

export const bddEnergie = sqliteTable("bdd_energie", {
  id: integer("id").primaryKey(),
  zoneClimatique: text("zone_climatique"),
  typologie: text("typologie"),
  etatIsolationMenuiseries: text("etat_isolation_menuiseries"),
  etatIsolationPlancherBas: text("etat_isolation_plancher_bas"),
  etatIsolationPlancherHaut: text("etat_isolation_plancher_haut"),
  etatIsolationMurs: text("etat_isolation_murs"),
  scenarioRenovationEnveloppe: text("scenario_renovation_enveloppe"),
  etatIsolationMenuiseriesApresScénarioRenovationEnveloppe: text(
    "etat_isolation_menuiseries_apres_scénario_renovation_enveloppe",
  ),
  etatIsolationPlancherBasApresScénarioRenovationEnveloppe: text(
    "etat_isolation_plancher_bas_apres_scénario_renovation_enveloppe",
  ),
  etatIsolationPlancherHautApresScénarioRenovationEnveloppe: text(
    "etat_isolation_plancher_haut_apres_scénario_renovation_enveloppe",
  ),
  etatIsolationMursApresScénarioRenovationEnveloppe: text("etat_isolation_murs_apres_scénario_renovation_enveloppe"),
  typeCh: text("type_CH"),
  typeEcs: text("type_ECS"),
  ch: text("CH"),
  ecs: text("ECS"),
  emetteur: text("emetteur"),
  scenarioRenovationSysteme: text("scenario_renovation_systeme"),
  usageCh: text("usage_CH", drizzleEnumUsages).notNull(),
  usageEcs: text("usage_ECS", drizzleEnumUsages).notNull(),
  cep: integer("CEP"),
  ges: integer("GES"),
  dpe: text("DPE"),
  gainCep: text("gain_CEP"),
});

export const typologies = sqliteTable("typologies", {
  id: integer("id").primaryKey(),
  typologie: text("typologie", enumTypologies).notNull(),
  minPeriode: integer("min_periode"),
  maxPeriode: integer("max_periode"),
  minLogements: integer("min_logements"),
  maxLogements: integer("max_logements"),
  niveauRenovation: text("niveau_renovation", enumNiveauxRenovation),
  surfaceHabitable: integer("surface_habitable").notNull(),
  nbLogements: integer("nb_logements"),
  etatIsolationMenuiseries: text("etat_isolation_menuiseries", enumIsolation).notNull(),
  surfaceMenuiseries: integer("surface_menuiseries").notNull(),
  etatIsolationPlancherBas: text("etat_isolation_plancher_bas", enumIsolation).notNull(),
  surfacePlancherBas: integer("surface_plancher_bas").notNull(),
  etatIsolationPlancherHaut: text("etat_isolation_plancher_haut", enumIsolation).notNull(),
  surfacePlancherHaut: integer("surface_plancher_haut").notNull(),
  etatIsolationMurs: text("etat_isolation_murs", enumIsolation).notNull(),
  surfaceMurs: integer("surface_murs").notNull(),
});

export const typologiesZodSchema = createSelectSchema(typologies);

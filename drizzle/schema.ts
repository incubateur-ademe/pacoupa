import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

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

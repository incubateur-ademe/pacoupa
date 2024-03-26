import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const solutions = sqliteTable("solutions", {
  id: text("id").primaryKey(),
  name: text("name"),
  type: text("type"),
  usageCh: text("usage_CH"),
  usageEcs: text("usage_ECS"),
  usageFr: text("usage_FR"),
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
  noteImpactVisuel: text("note_impact_visuel"),
  noteImpactSonore: text("note_Impact_sonore"),
  noteImpactEspaceExterieur: text("note_impact_espace_exterieur"),
  noteEnvironnemental: text("note_environnemental"),
  noteMaturite: text("note_maturite"),
  commentaireApp: text("commentaire_app"),
  commentairePouget: text("commentaire_pouget"),
});

export const caracteristiques = sqliteTable(
  "caracteristiques",
  {
    id: integer("id").primaryKey(),
    ch: text("CH"),
    ecs: text("ECS"),
    emetteur: text("emetteur"),
    espaceExterieur: text("espace_exterieur"),
    envContraint: text("env_contraint"),
    toitureTerrasse: text("toiture_terrasse"),
    temperature: text("temperature"),
    nbLgts: text("nb_lgts"),
    niveauRenovation: text("niveau_renovation"),
  },
  table => {
    return {
      idxCaracteristiquesChEcsEmetteurEspaceExterieurEnvContraintToitureTerrasseTemperatureNbLgtsNiveauRenovation:
        uniqueIndex(
          "idx_caracteristiques_CH_ECS_emetteur_espace_exterieur_env_contraint_toiture_terrasse_temperature_nb_lgts_niveau_renovation",
        ).on(
          table.ch,
          table.ecs,
          table.emetteur,
          table.espaceExterieur,
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
  caracteristiquesId: integer("caracteristiques_id").references(() => caracteristiques.id),
  idSolution: text("id_solution").references(() => solutions.id),
  ordreSolution: integer("ordre_solution"),
  difficulte: text("difficulte"),
  impactTravauxColl: text("impact_travaux_coll"),
  impactTravauxIndiv: text("impact_travaux_indiv"),
  cout: text("cout"),
  typeSolution: text("type_solution"),
  usageCh: text("usage_CH"),
  usageEcs: text("usage_ECS"),
  usageFr: text("usage_FR"),
  alertes: integer("alertes"),
});

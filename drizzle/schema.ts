import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

import { enumDPE } from "@/lib/common/domain/values/DPE";
import { enumEmetteur } from "@/lib/common/domain/values/Emetteur";
import { enumEnvironnementContraint } from "@/lib/common/domain/values/EnvironnementContraint";
import { enumNbLogement } from "@/lib/common/domain/values/NbLogement";
import { enumNiveauRenovationSimu1 } from "@/lib/common/domain/values/NiveauRenovation";
import { enumOuiNonNa } from "@/lib/common/domain/values/OuiNonNa";
import { enumScenarioRenovationEnveloppe } from "@/lib/common/domain/values/ScenarioRenovationEnveloppe";
import { enumScenarioRenovationSysteme } from "@/lib/common/domain/values/ScenarioRenovationSysteme";
import { enumIdSolution } from "@/lib/common/domain/values/Solution";
import { enumFamille } from "@/lib/common/domain/values/SolutionFamille";
import { enumIsolation } from "@/lib/common/domain/values/SolutionIsolation";
import { enumNiveauRenovation } from "@/lib/common/domain/values/SolutionNiveauRenovation";
import { enumNote } from "@/lib/common/domain/values/SolutionNote";
import { enumType, enumTypeWithoutMix } from "@/lib/common/domain/values/SolutionTypes";
import { enumUsage } from "@/lib/common/domain/values/SolutionUsage";
import { enumTemperature } from "@/lib/common/domain/values/Temperature";
import { enumToitureTerrasse } from "@/lib/common/domain/values/ToitureTerrasse";
import { enumTypeCH } from "@/lib/common/domain/values/TypeCH";
import { enumTypeECS } from "@/lib/common/domain/values/TypeECS";
import { enumTypeSysteme } from "@/lib/common/domain/values/TypeSysteme";
import { enumTypologie } from "@/lib/common/domain/values/Typologie";
import { enumZoneClimatique } from "@/lib/common/domain/values/ZoneClimatique";

export const solutions = sqliteTable("solutions", {
  id: text("id", { enum: enumIdSolution }).primaryKey(),
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
    ch: text("CH", { enum: enumTypeWithoutMix }),
    ecs: text("ECS", { enum: enumTypeWithoutMix }),
    emetteur: text("emetteur", { enum: enumEmetteur }),
    espaceExterieurPersonnel: text("espace_exterieur_personnel", { enum: enumOuiNonNa }),
    envContraint: text("env_contraint", { enum: enumEnvironnementContraint }),
    toitureTerrasse: text("toiture_terrasse", { enum: enumToitureTerrasse }),
    temperature: text("temperature", { enum: enumTemperature }),
    nbLgts: text("nb_lgts", { enum: enumNbLogement }),
    niveauRenovation: text("niveau_renovation", { enum: enumNiveauRenovationSimu1 }),
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

export const solutionsParCriteres = sqliteTable(
  "solutions_par_criteres",
  {
    criteresId: integer("criteres_id").references(() => criteres.id),
    solutionsId: text("solutions_id").references(() => solutions.id),
    ordreSolution: integer("ordre_solution"),
    noteDifficulte: text("note_difficulte", { enum: enumNote }).notNull(),
    noteImpactTravauxColl: text("note_impact_travaux_coll", { enum: enumNote }).notNull(),
    noteImpactTravauxIndiv: text("note_impact_travaux_indiv", { enum: enumNote }).notNull(),
    noteCout: text("note_cout", { enum: enumNote }).notNull(),
    typeSolution: text("type_solution"),
  },
  table => {
    return {
      idxSolutionsParCriteresCriteresId: index("idx_solutions_par_criteres_criteres_id").on(table.criteresId),
      idxSolutionsParCriteresSolutionsId: index("idx_solutions_par_criteres_solutions_id").on(table.solutionsId),
    };
  },
);

export const bddEnergie = sqliteTable(
  "bdd_energie",
  {
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
    etatIsolationMenuiseriesApresScenarioRenovationEnveloppe: text(
      "etat_isolation_menuiseries_apres_scenario_renovation_enveloppe",
      { enum: enumIsolation },
    ).notNull(),
    etatIsolationPlancherBasApresScenarioRenovationEnveloppe: text(
      "etat_isolation_plancher_bas_apres_scenario_renovation_enveloppe",
      { enum: enumIsolation },
    ).notNull(),
    etatIsolationPlancherHautApresScenarioRenovationEnveloppe: text(
      "etat_isolation_plancher_haut_apres_scenario_renovation_enveloppe",
      { enum: enumIsolation },
    ).notNull(),
    etatIsolationMursApresScenarioRenovationEnveloppe: text("etat_isolation_murs_apres_scenario_renovation_enveloppe", {
      enum: enumIsolation,
    }).notNull(),
    typeCh: text("type_CH", { enum: enumTypeCH }).notNull(),
    typeEcs: text("type_ECS", { enum: enumTypeECS }).notNull(),
    ch: text("CH", { enum: enumTypeWithoutMix }).notNull(),
    ecs: text("ECS", { enum: enumTypeWithoutMix }).notNull(),
    scenarioRenovationSysteme: text("scenario_renovation_systeme", { enum: enumScenarioRenovationSysteme }).notNull(),
    cep: integer("CEP").notNull(),
    ges: integer("GES").notNull(),
    dpe: text("DPE", { enum: enumDPE }).notNull(),
    gainEnergetique: text("gain_energetique_%").notNull(),
    dpeInitiale: text("etiquette_dpe_initiale", { enum: enumDPE }).notNull(),
  },
  table => {
    return {
      idxBddEnergieTypologieEcsChScenarioRenovationEnveloppeScenarioRenovationSysteme: index(
        "idx_bdd_energie_typologie_ECS_CH_scenario_renovation_enveloppe_scenario_renovation_systeme",
      ).on(table.typologie, table.ecs, table.ch, table.scenarioRenovationEnveloppe, table.scenarioRenovationSysteme),
    };
  },
);

export const bddEco = sqliteTable(
  "bdd_eco",
  {
    id: integer("id").primaryKey(),
    zoneClimatique: text("zone_climatique", { enum: enumZoneClimatique }).notNull(),
    typologie: text("typologie", { enum: enumTypologie }).notNull(),
    scenarioRenovationEnveloppe: text("scenario_renovation_enveloppe", {
      enum: enumScenarioRenovationEnveloppe,
    }).notNull(),
    typeCh: text("type_CH").notNull(),
    typeEcs: text("type_ECS").notNull(),
    ch: text("CH").notNull(),
    ecs: text("ECS").notNull(),
    scenarioRenovationSysteme: text("scenario_renovation_systeme", { enum: enumScenarioRenovationSysteme }).notNull(),
    coutsSolution01: integer("couts_solution_01").notNull(),
    coutsSolution02: integer("couts_solution_02").notNull(),
    coutsSolution03: integer("couts_solution_03").notNull(),
    coutsSolution04: integer("couts_solution_04").notNull(),
    coutsSolution05: integer("couts_solution_05").notNull(),
    coutsSolution06: integer("couts_solution_06").notNull(),
    coutsSolution07: integer("couts_solution_07").notNull(),
    coutsSolution08: integer("couts_solution_08").notNull(),
    coutsSolution10: integer("couts_solution_10").notNull(),
    coutsSolution11: integer("couts_solution_11").notNull(),
    coutsSolution12: integer("couts_solution_12").notNull(),
    coutsSolution13: integer("couts_solution_13").notNull(),
    coutsSolution15: integer("couts_solution_15").notNull(),
    coutsSolution16: integer("couts_solution_16").notNull(),
    coutsSolution20: integer("couts_solution_20").notNull(),
    coutsSolution21: integer("couts_solution_21").notNull(),
    coutsSolution22: integer("couts_solution_22").notNull(),
    coutsSolution23: integer("couts_solution_23").notNull(),
    coutsSolution25: integer("couts_solution_25").notNull(),
    coutsSolution26: integer("couts_solution_26").notNull(),
    coutsSolution30: integer("couts_solution_30").notNull(),
    coutsSolution31: integer("couts_solution_31").notNull(),
    coutsSolution32: integer("couts_solution_32").notNull(),
    coutsSolution40: integer("couts_solution_40").notNull(),
    coutsSolution50: integer("couts_solution_50").notNull(),
    coutsSolution51: integer("couts_solution_51").notNull(),
    coutsSolution52: integer("couts_solution_52").notNull(),
    coutsSolution53: integer("couts_solution_53").notNull(),
    coutsSolution54: integer("couts_solution_54").notNull(),
    coutsSolution60: integer("couts_solution_60").notNull(),
    coutsSolution61: integer("couts_solution_61").notNull(),
    coutAbonnement: integer("cout_abonnement").notNull(),
    coutMaintenance: integer("cout_maintenance").notNull(),
    coutIsolationEnveloppe: integer("cout_isolation_enveloppe"),
    factureEnergetique: integer("facture_energetique").notNull(),
    aidesSolution01: integer("aides_solution_01").notNull(),
    aidesSolution02: integer("aides_solution_02").notNull(),
    aidesSolution03: integer("aides_solution_03").notNull(),
    aidesSolution04: integer("aides_solution_04").notNull(),
    aidesSolution05: integer("aides_solution_05").notNull(),
    aidesSolution06: integer("aides_solution_06").notNull(),
    aidesSolution07: integer("aides_solution_07").notNull(),
    aidesSolution08: integer("aides_solution_08").notNull(),
    aidesSolution10: integer("aides_solution_10").notNull(),
    aidesSolution11: integer("aides_solution_11").notNull(),
    aidesSolution12: integer("aides_solution_12").notNull(),
    aidesSolution13: integer("aides_solution_13").notNull(),
    aidesSolution15: integer("aides_solution_15").notNull(),
    aidesSolution16: integer("aides_solution_16").notNull(),
    aidesSolution20: integer("aides_solution_20").notNull(),
    aidesSolution21: integer("aides_solution_21").notNull(),
    aidesSolution22: integer("aides_solution_22").notNull(),
    aidesSolution23: integer("aides_solution_23").notNull(),
    aidesSolution25: integer("aides_solution_25").notNull(),
    aidesSolution26: integer("aides_solution_26").notNull(),
    aidesSolution30: integer("aides_solution_30").notNull(),
    aidesSolution31: integer("aides_solution_31").notNull(),
    aidesSolution32: integer("aides_solution_32").notNull(),
    aidesSolution40: integer("aides_solution_40").notNull(),
    aidesSolution50: integer("aides_solution_50").notNull(),
    aidesSolution51: integer("aides_solution_51").notNull(),
    aidesSolution52: integer("aides_solution_52").notNull(),
    aidesSolution53: integer("aides_solution_53").notNull(),
    aidesSolution54: integer("aides_solution_54").notNull(),
    aidesSolution60: integer("aides_solution_60").notNull(),
    aidesSolution61: integer("aides_solution_61").notNull(),
  },
  table => {
    return {
      idxBddEcoTypologieEcsChScenarioRenovationEnveloppeScenarioRenovationSysteme: index(
        "idx_bdd_eco_typologie_ECS_CH_scenario_renovation_enveloppe_scenario_renovation_systeme",
      ).on(table.typologie, table.ecs, table.ch, table.scenarioRenovationEnveloppe, table.scenarioRenovationSysteme),
    };
  },
);

export const typologies = sqliteTable("typologies", {
  id: integer("id").primaryKey(),
  nom: text("nom", { enum: enumTypologie }).notNull(),
  minPeriode: integer("min_periode"),
  maxPeriode: integer("max_periode"),
  minLogements: integer("min_logements"),
  maxLogements: integer("max_logements"),
  niveauRenovation: text("niveau_renovation", { enum: enumNiveauRenovation }),
  surfaceHabitable: integer("surface_habitable").notNull(),
  nbLogements: integer("nb_logements"),
  etatIsolationMenuiseries: text("etat_isolation_menuiseries", { enum: enumIsolation }).notNull(),
  surfaceMenuiseries: integer("surface_menuiseries").notNull(),
  etatIsolationPlancherBas: text("etat_isolation_plancher_bas", { enum: enumIsolation }).notNull(),
  surfacePlancherBas: integer("surface_plancher_bas").notNull(),
  etatIsolationPlancherHaut: text("etat_isolation_plancher_haut", { enum: enumIsolation }).notNull(),
  surfacePlancherHaut: integer("surface_plancher_haut").notNull(),
  etatIsolationMurs: text("etat_isolation_murs", { enum: enumIsolation }).notNull(),
  surfaceMurs: integer("surface_murs").notNull(),
});

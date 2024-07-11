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
    scenarioRenovationSysteme: text("scenario_renovation_systeme", { enum: enumScenarioRenovationSysteme }).notNull(),
    cep: integer("CEP"),
    ges: integer("GES"),
    dpe: text("DPE", { enum: enumDPE }).notNull(),
  },
  table => {
    return {
      idxBddEnergieTypologieEcsChScenarioRenovationEnveloppeScenarioRenovationSysteme: index(
        "idx_bdd_energie_typologie_ECS_CH_scenario_renovation_enveloppe_scenario_renovation_systeme",
      ).on(table.typologie, table.ecs, table.ch, table.scenarioRenovationEnveloppe, table.scenarioRenovationSysteme),
    };
  },
);

export const bddCout = sqliteTable(
  "bdd_cout",
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
    scenarioRenovationSysteme: text("scenario_renovation_systeme", { enum: enumScenarioRenovationSysteme }).notNull(),
    solution01: integer("solution_01").notNull(),
    solution02: integer("solution_02").notNull(),
    solution03: integer("solution_03").notNull(),
    solution04: integer("solution_04").notNull(),
    solution05: integer("solution_05").notNull(),
    solution06: integer("solution_06").notNull(),
    solution07: integer("solution_07").notNull(),
    solution08: integer("solution_08").notNull(),
    solution10: integer("solution_10").notNull(),
    solution11: integer("solution_11").notNull(),
    solution12: integer("solution_12").notNull(),
    solution13: integer("solution_13").notNull(),
    solution15: integer("solution_15").notNull(),
    solution16: integer("solution_16").notNull(),
    solution20: integer("solution_20").notNull(),
    solution21: integer("solution_21").notNull(),
    solution22: integer("solution_22").notNull(),
    solution23: integer("solution_23").notNull(),
    solution25: integer("solution_25").notNull(),
    solution26: integer("solution_26").notNull(),
    solution30: integer("solution_30").notNull(),
    solution31: integer("solution_31").notNull(),
    solution32: integer("solution_32").notNull(),
    solution40: integer("solution_40").notNull(),
    solution50: integer("solution_50").notNull(),
    solution51: integer("solution_51").notNull(),
    solution52: integer("solution_52").notNull(),
    solution53: integer("solution_53").notNull(),
    solution54: integer("solution_54").notNull(),
    solution60: integer("solution_60").notNull(),
    solution61: integer("solution_61").notNull(),
    coutAbonnement: integer("cout_abonnement").notNull(),
    coutMaintenance: integer("cout_maintenance").notNull(),
    coutIsolationEnveloppe: integer("cout_isolation_enveloppe"),
    factureEnergetique: integer("facture_energetique").notNull(),
  },
  table => {
    return {
      idxBddCoutTypologieEcsChScenarioRenovationEnveloppeScenarioRenovationSysteme: index(
        "idx_bdd_cout_typologie_ECS_CH_scenario_renovation_enveloppe_scenario_renovation_systeme",
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

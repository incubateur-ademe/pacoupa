import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";

type EnergieEcsPossibleContexte = {
  energieCh: InformationBatiment["energieCH"];
  typeCh: InformationBatiment["typeCH"];
  typeEcs: InformationBatiment["typeECS"];
};

type TypeEcsPossibleContexte = Omit<EnergieEcsPossibleContexte, "typeEcs">;

type EnergieChPossibleContexte = Omit<TypeEcsPossibleContexte, "energieCh">;

export function getEnergieEcsPossibles(criteria: EnergieEcsPossibleContexte) {
  return Array.from(
    new Set(
      allCasPossibles
        .filter(
          cas =>
            cas.typeCh === criteria.typeCh && cas.energieCh === criteria.energieCh && cas.typeEcs === criteria.typeEcs,
        )
        .map(cas => cas.energieEcs),
    ),
  );
}

export function getTypeEcsPossibles(criteria: TypeEcsPossibleContexte) {
  return Array.from(
    new Set(
      allCasPossibles
        .filter(cas => cas.typeCh === criteria.typeCh && cas.energieCh === criteria.energieCh)
        .map(cas => cas.typeEcs),
    ),
  );
}

export function getEnergieChPossibles(criteria: EnergieChPossibleContexte) {
  return Array.from(new Set(allCasPossibles.filter(cas => cas.typeCh === criteria.typeCh).map(cas => cas.energieCh)));
}

/*
 Tous les cas sont rencensés ici. Par exemple, on ne peut avoir un chauffage collectif à l'électricité ou un chauffage 
 individuel au fioul.  Comme on pose les questions dans un certain ordre, on a ce système de contexte qui prend les informations 
 précédemment renseignées par l'utilisateur.
 Dans le doute, on a gardé les cas impossible au cas où on voudrait, plus tard, créer une API pour afficher tous les cas.
 */
export const allCas = [
  {
    typeCh: "collectif",
    energieCh: "electricite",
    typeEcs: "individuel",
    energieEcs: "gaz",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "electricite",
    typeEcs: "collectif",
    energieEcs: "gaz",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "electricite",
    typeEcs: "individuel",
    energieEcs: "electricite",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "electricite",
    typeEcs: "collectif",
    energieEcs: "electricite",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "electricite",
    typeEcs: "individuel",
    energieEcs: "fioul",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "electricite",
    typeEcs: "collectif",
    energieEcs: "fioul",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "fioul",
    typeEcs: "individuel",
    energieEcs: "gaz",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "fioul",
    typeEcs: "collectif",
    energieEcs: "gaz",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "fioul",
    typeEcs: "individuel",
    energieEcs: "electricite",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "fioul",
    typeEcs: "collectif",
    energieEcs: "electricite",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "fioul",
    typeEcs: "individuel",
    energieEcs: "fioul",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "fioul",
    typeEcs: "collectif",
    energieEcs: "fioul",
    estPossible: "oui",
  },
  {
    typeCh: "collectif",
    energieCh: "gaz",
    typeEcs: "individuel",
    energieEcs: "gaz",
    estPossible: "oui",
  },
  {
    typeCh: "collectif",
    energieCh: "gaz",
    typeEcs: "collectif",
    energieEcs: "gaz",
    estPossible: "oui",
  },
  {
    typeCh: "collectif",
    energieCh: "gaz",
    typeEcs: "individuel",
    energieEcs: "electricite",
    estPossible: "oui",
  },
  {
    typeCh: "collectif",
    energieCh: "gaz",
    typeEcs: "collectif",
    energieEcs: "electricite",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "gaz",
    typeEcs: "individuel",
    energieEcs: "fioul",
    estPossible: "non",
  },
  {
    typeCh: "collectif",
    energieCh: "gaz",
    typeEcs: "collectif",
    energieEcs: "fioul",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "electricite",
    typeEcs: "individuel",
    energieEcs: "gaz",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "electricite",
    typeEcs: "collectif",
    energieEcs: "gaz",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "electricite",
    typeEcs: "individuel",
    energieEcs: "electricite",
    estPossible: "oui",
  },
  {
    typeCh: "individuel",
    energieCh: "electricite",
    typeEcs: "collectif",
    energieEcs: "electricite",
    estPossible: "oui",
  },
  {
    typeCh: "individuel",
    energieCh: "electricite",
    typeEcs: "individuel",
    energieEcs: "fioul",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "electricite",
    typeEcs: "collectif",
    energieEcs: "fioul",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "fioul",
    typeEcs: "individuel",
    energieEcs: "gaz",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "fioul",
    typeEcs: "collectif",
    energieEcs: "gaz",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "fioul",
    typeEcs: "individuel",
    energieEcs: "electricite",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "fioul",
    typeEcs: "collectif",
    energieEcs: "electricite",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "fioul",
    typeEcs: "individuel",
    energieEcs: "fioul",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "fioul",
    typeEcs: "collectif",
    energieEcs: "fioul",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "gaz",
    typeEcs: "individuel",
    energieEcs: "gaz",
    estPossible: "oui",
  },
  {
    typeCh: "individuel",
    energieCh: "gaz",
    typeEcs: "collectif",
    energieEcs: "gaz",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "gaz",
    typeEcs: "individuel",
    energieEcs: "electricite",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "gaz",
    typeEcs: "collectif",
    energieEcs: "electricite",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "gaz",
    typeEcs: "individuel",
    energieEcs: "fioul",
    estPossible: "non",
  },
  {
    typeCh: "individuel",
    energieCh: "gaz",
    typeEcs: "collectif",
    energieEcs: "fioul",
    estPossible: "non",
  },
] as const;

const allCasPossibles = allCas.filter(cas => cas.estPossible === "oui");

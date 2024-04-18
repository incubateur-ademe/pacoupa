import { FamilleCetAirEauImage } from "@/components/img/familles/FamilleCetAirEauImage";
import { FamilleCetEauEauImage } from "@/components/img/familles/FamilleCetEauEauImage";
import { FamilleGeothermieImage } from "@/components/img/familles/FamilleGeothermieImage";
import { FamilleHybrideImage } from "@/components/img/familles/FamilleHybrideImage";
import { FamillePacAirAirImage } from "@/components/img/familles/FamillePacAirAirImage";
import { FamillePacAirEauImage } from "@/components/img/familles/FamillePacAirEauImage";
import { FamillePacEauEauImage } from "@/components/img/familles/FamillePacEauEauImage";
import { FamillePacEauxGrisesEau } from "@/components/img/familles/FamillePacEauxGrisesEau";
import { FamillePacSolaireEauImage } from "@/components/img/familles/FamillePacSolaireEauImage";
import { FamilleRcuImage } from "@/components/img/familles/FamilleRcuImage";
import { type GetSolutionsParCriteresReturnType } from "@/lib/server/useCases/getSolutionsParCriteres";

export const labelForType = (type: string = "") => {
  switch (type.toUpperCase()) {
    case "IND":
      return "Solution individuelle";
    case "COL":
      return "Solution collective";
    default:
      return "Solution mixte";
  }
};

export const imageForFamille = (famille: string) => {
  switch (famille) {
    case "RCU":
      return <FamilleRcuImage />;
    case "Geothermie":
      return <FamilleGeothermieImage />;
    case "PAC Air-Air":
      return <FamillePacAirAirImage />;
    case "PAC Air-Eau":
      return <FamillePacAirEauImage />;
    case "PAC Eau-Eau":
      return <FamillePacEauEauImage />;
    case "PAC Eaux grises-Eau":
      return <FamillePacEauxGrisesEau />;
    case "PAC Solaire-Eau":
      return <FamillePacSolaireEauImage />;
    case "Hybride PAC + Chaudière":
      return <FamilleHybrideImage />;
    case "CET Air-Eau":
      return <FamilleCetAirEauImage />;
    case "CET Eau-Eau":
      return <FamilleCetEauEauImage />;
  }
};

export const createRecommandations = (solution: GetSolutionsParCriteresReturnType[number]) => {
  const obj = {
    Chauffage:
      solution.usageCH !== "Non" ? (solution.usageCH === "Oui" ? ("success" as const) : ("info" as const)) : null,
    ECS: solution.usageECS !== "Non" ? (solution.usageECS === "Oui" ? ("success" as const) : ("info" as const)) : null,
    Climatisation:
      solution.usageFr !== "Non" ? (solution.usageFr === "Oui" ? ("success" as const) : ("info" as const)) : null,
  };

  return Object.entries(obj).filter(([_, value]) => value !== null);
};

export const noteEnvironmentHelper = (note: string) => {
  switch (note) {
    case "A":
      return { label: "Très positif", number: 5 };
    case "B":
      return { label: "Positif", number: 4 };
    case "C":
      return { label: "Modéré", number: 3 };
    case "D":
      return { label: "Léger", number: 2 };
    case "E":
      return { label: "Faible", number: 1 };
    default:
      return { label: "Non renseigné", number: 0 };
  }
};

export const noteCoutHelper = (note: string) => {
  switch (note) {
    case "A":
      return { label: "Très faible", number: 1 };
    case "B":
      return { label: "Faible", number: 2 };
    case "C":
      return { label: "Modéré", number: 3 };
    case "D":
      return { label: "Important", number: 4 };
    case "E":
      return { label: "Très important", number: 5 };
    default:
      return { label: "Non renseigné", number: 0 };
  }
};

export const noteDifficulteHelper = (note: string) => {
  switch (note) {
    case "A":
      return { label: "Très facile", number: 1 };
    case "B":
      return { label: "Facile", number: 2 };
    case "C":
      return { label: "Modéré", number: 3 };
    case "D":
      return { label: "Difficile", number: 4 };
    case "E":
      return { label: "Très difficile", number: 5 };
    default:
      return { label: "Non renseigné", number: 0 };
  }
};

import { type Solution } from "@/lib/enums";

export const solution = {
  id: "13",
  nom: "Pompe à chaleur eau / eau géothermie",
  familleSolution: "PAC Eau-Eau",
  type: "COL",
  typeSysteme: "CH + ECS : PAC Air / Eau",
  description:
    "La pompe à chaleur (PAC) eau / eau prélève de la chaleur dans le sol, augmente son niveau de température et la transfère à un circuit d'eau.",
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Possible",
  environnement: {
    note: "A",
    text: [
      {
        titre: "Consommation d’énergie",
        contenu:
          "La pompe à chaleur utilise une énergie décarbonée (l’électricité). Le rendement d'une pompe à chaleur géothermique est, en moyenne, cinq fois supérieur à celui d’un radiateur électrique ou d’une chaudière.",
      },
      {
        titre: "Entretien",
        contenu: "Au même titre qu’une chaudière, il est important de prévoir une maintenance régulière des appareils.",
      },
    ],
  },
  cout: {
    note: "dynamic",
  },
  difficulte: {
    note: "dynamic",
    image: "08-13-23 - PAC geothermique - facilite installation.png",
    text: [
      {
        titre: "Sonde géothermique",
        contenu:
          "Une PAC eau-eau capte des calories sur des sondes géothermiques verticales ou sur l’eau d’une nappe phréatique. Il faut donc prévoir le forage pour la sonde et/ou l’installation d’une pompe pour la nappe phréatique.",
      },
      {
        titre: "Raccordement électrique",
        contenu: "Anticipez l’impact sur la puissance de raccordement électrique.",
      },
      {
        titre: "Réseaux hydrauliques",
        contenu:
          "Nettoyage et isolation des réseaux chauffage et ECS à prévoir pour optimiser la performance de l’installation.",
      },
    ],
  },
  travauxCollectif: {
    note: "dynamic",
    image: "08-13-23 - PAC geothermique - parties communes.png",
    text: [
      {
        titre: "Déroulement des travaux",
        contenu:
          "Travaux importants dans les parties extérieures comme le jardin et/ou la nappe phréatique le temps de l’installation.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    text: [
      {
        titre: "Emprise logement",
        contenu: "Aucune.",
      },
      {
        titre: "Déroulement des travaux",
        contenu: "Pas de travaux dans les appartements.",
      },
    ],
  },
  acoustique: {
    note: "A",
    text: [
      {
        titre: "Acoustique",
        contenu: "Aucune nuisance sonore.",
      },
    ],
  },
  espaceExterieur: {
    note: "B",
    text: [
      {
        titre: "Sonde géothermique",
        contenu:
          "Une PAC eau-eau capte des calories sur des sondes géothermiques verticales ou sur l’eau d’une nappe phréatique. Une fois l’installation faite, il n’y a plus d’impact visuel.",
      },
    ],
  },
  maturite: {
    note: "A",
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;

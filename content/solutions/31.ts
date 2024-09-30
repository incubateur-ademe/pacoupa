import { ficheReference31 } from "@__content/fiches-reference";

import { type Solution } from "@/lib/common/domain/values/Solution";

export const solution = {
  id: "31",
  nom: "Chauffe-eau thermodynamique air / eau (avec unité extérieure)",
  familleSolution: "CET Air-Eau",
  type: "IND",
  typeSysteme: "ECS seule : PAC Air / Eau",
  description:
    "Le chauffe-eau thermodynamique (CET) capte de la chaleur sur l'air extérieur, et produit de l'eau chaude.",
  usageCh: "Non",
  usageEcs: "Oui",
  usageFr: "Non",
  environnement: {
    note: "B",
    texte: [
      {
        titre: "Eau chaude sanitaire uniquement",
        contenu:
          "Un chauffe-eau thermodynamique (CET) est une solution renouvelable (ENR) pour produire de l’eau chaude sanitaire, mais pas de chauffage. Cela représente environ 30% des besoins globaux de l’appartement.",
      },
    ],
  },
  cout: {
    note: "dynamic",
  },
  difficulte: {
    note: "dynamic",
    texte: [
      {
        titre: "Solution individuelle avec unité extérieure",
        contenu:
          "Un chauffe-eau thermodynamique (CET) est présent dans chaque logement et produit de l’Eau Chaude Sanitaire (ECS). Il est composé d’une unité extérieure (comme une PAC) et d’une unité intérieure (ballon de stockage ECS).",
      },
      {
        titre: "Emprise des PAC",
        contenu:
          "Assurez-vous que la place est suffisante en toiture, sur les balcons ou dans le jardin : 0,3 à 0,6 m² pour une PAC (3 à 4 m² en comprenant la surface libre).",
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
    texte: [
      {
        titre: "Travaux à prévoir",
        contenu: "Aucun.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    texte: [
      {
        titre: "Emprise logement",
        contenu: "Il faut prévoir un encombrement d'environ 60x60x250 cm.",
      },
      {
        titre: "Déroulement des travaux",
        contenu:
          "Il est nécessaire d’installer une unité intérieure, ainsi qu’une unité extérieure qui peut idéalement être installée en toiture - pour limiter les contraintes acoustiques - ou sur les balcons de l’appartement.",
      },
    ],
  },
  acoustique: {
    note: "C",
    texte: [
      {
        titre: "Volume sonore",
        contenu: "De 45 à 65dB (unité extérieure) / de 30 à 50dB (unité intérieure).",
      },
      {
        titre: "Acoustique unité extérieure",
        contenu:
          "Le bruit d’une PAC est couvert par les bruits ambiants la journée mais peut être gênant la nuit si l’unité est trop proche des chambres. Il est conseillé d’installer les unités extérieures en toiture pour limiter les contraintes acoustiques. Il existe des solutions pour diminuer l’impact sonore des unités extérieures.",
      },
      {
        titre: "Acoustique unité intérieure",
        contenu: "Le module intérieur a une puissance acoustique faible, il peut être intégré en cuisine.",
      },
    ],
  },
  espaceExterieur: {
    note: "D",
    image: "31 - CET air eau - impact exterieur.png",
    texte: [
      {
        titre: "Unité extérieure",
        contenu: "Le chauffe-eau thermodynamique est composé d’une unité extérieure et d’une unité intérieure.",
      },
      {
        titre: "Emprise des PAC",
        contenu:
          "Assurez-vous que la place est suffisante en toiture, sur les balcons ou dans le jardin : 0,3 à 0,6 m² pour une PAC (3 à 4 m² en comprenant la surface libre).",
      },
      {
        titre: "Structure",
        contenu:
          "En cas de pose en toiture-terrasse, anticipez l’impact des PAC sur la capacité structurelle de la toiture.",
      },
      {
        titre: "PLU",
        contenu:
          "Vérifiez que l'installation de PAC est compatible avec le PLU (notamment la hauteur si la PAC est en toiture).",
      },
    ],
  },
  maturite: {
    note: "A",
    texte: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
  ficheReference: ficheReference31,
} satisfies Solution;

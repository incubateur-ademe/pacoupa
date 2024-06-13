import { type Solution } from "@/lib/common/domain/values/Solution";

export const solution = {
  id: "61",
  nom: "Chauffe-eau thermodynamique individuel sur retour de chauffage collectif",
  familleSolution: "CET Eau-Eau",
  type: "MIX",
  typeSysteme: "CH + ECS : PAC Air / Eau",
  description:
    "Le chauffe-eau thermodynamique (CET) récupère la chaleur dans l'eau de retour du réseau de chauffage collectif pour chauffer l'eau sanitaire.",
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Possible",
  environnement: {
    note: "A",
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
        titre: "Solution individuelle couplée à une solution collective",
        contenu:
          "Un chauffe-eau thermodynamique (CET) eau-eau est présent dans chaque logement pour fournir de l’Eau Chaude Sanitaire (ECS). Ce CET individuel est raccordé sur le retour de l’émetteur de chauffage basse température (plancher chauffant par exemple). Le chauffage est assuré par une PAC collective.",
      },
      {
        titre: "Structure",
        contenu:
          "En cas de pose en toiture-terrasse d’une PAC collective, anticipez l’impact des PAC sur la capacité structurelle de la toiture.",
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
        titre: "Déroulement des travaux",
        contenu:
          "Les travaux dépendent de l'alimentation de la boucle d'eau chauffage. Par exemple, si c'est une PAC géothermique, l'emprise extérieure sera nulle. Si c'est une PAC Air / Eau, il faudra s'assurer que la place est suffisante en toiture ou dans le jardin.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    image: "61 - CET indiv sur retour chauffage - CET - appartement.png",
    texte: [
      {
        titre: "Emprise logement",
        contenu: "Il faut prévoir un encombrement d'environ 60x60x250 cm.",
      },
      {
        titre: "Déroulement des travaux",
        contenu:
          "Il est nécessaire d’installer une unité intérieure, qui est raccordée sur une boucle d’eau collective.",
      },
    ],
  },
  acoustique: {
    note: "C",
    texte: [
      {
        titre: "Volume sonore",
        contenu: "de 45 à 65dB (unité extérieure) / de 30 à 50dB (unité intérieure)",
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
    image: "10-20 - PAC air eau - impact exterieur.png",
    note: "C",
    texte: [
      {
        titre: "Unité extérieure",
        contenu:
          "Certaines solutions pour le chauffage collectif nécessitent une unité extérieure, d’autres non. Les PAC air / eau disposent d’une unité extérieure (posées sur le sol, en toiture, jardin ou terrasse), les PAC eau / eau en géothermie n’ont pas d’unité extérieure apparente.",
      },
      {
        titre: "Emprise des PAC",
        contenu:
          "L'emprise des PAC à l'extérieur dépendra de l'alimentation de la boucle d'eau tempérée. Par exemple, si c'est une PAC géothermique, l'emprise extérieure sera nulle. Si c'est une PAC Air / Eau, il faudra s'assurer que la place est suffisante en toiture ou dans le jardin.",
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
    note: "E",
    texte: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;

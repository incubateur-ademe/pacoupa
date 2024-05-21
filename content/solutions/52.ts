import { type Solution } from "@/lib/enums";

// TODO: solution à supprimer ??

export const solution = {
  id: "52",
  nom: "PAC Air / Air avec ECS",
  familleSolution: "PAC Air-Air",
  type: "COL",
  description:
    "La pompe à chaleur (PAC) air / air utilise l'air extérieur comme source d'énergie pour chauffer (ou refroidir) l'air à l'intérieur.",
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Oui",
  environnement: {
    note: "C",
    text: [
      {
        titre: "Consommation d’énergie",
        contenu:
          "La pompe à chaleur utilise une énergie décarbonée (l’électricité). Son rendement est, en moyenne, trois fois supérieur à celui d’un radiateur électrique ou d’une chaudière. Attention cependant à son utilisation en climatisation qui peut consommer beaucoup d’énergie et rejette de l’air chaud à l’extérieur.",
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
    text: [
      {
        titre: "Unités extérieures et intérieures",
        contenu:
          "Chaque logement est équipé d’une PAC qui produit du chauffage par l’air et de l’Eau Chaude Sanitaire (ECS). Elle est composée d’une unité extérieure et d’une unité intérieure (avec notamment le ballon de stockage ECS). Il est conseillé d’installer les unités extérieures en toiture pour limiter les contraintes acoustiques.",
      },
      {
        titre: "Structure",
        contenu:
          "En cas de pose en toiture-terrasse, anticipez l’impact des PAC sur la capacité structurelle de la toiture.",
      },
      {
        titre: "Raccordement électrique",
        contenu: "Anticipez l’impact sur la puissance de raccordement électrique.",
      },
      {
        titre: "Réseaux hydrauliques",
        contenu: "Prévoir une éventuelle rénovation des réseaux d'ECS et création d’un réseau de fluide frigorigène.",
      },
    ],
  },
  travauxCollectif: {
    note: "dynamic",
    text: [
      {
        titre: "Réseau de fluide frigorigène",
        contenu:
          "Il faut prévoir la création d’un réseau de fluide frigorigène entre les unités extérieures et les unités intérieures qui sont disposées dans chaque logement.",
      },
      {
        titre: "Déroulement des travaux",
        contenu: "Travaux rapides dans des parties communes peu fréquentées.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    text: [
      {
        titre: "Déroulement des travaux",
        contenu:
          "Des unités intérieures (avec notamment le ballon de stockage ECS) sont installées dans chaque logement.",
      },
      {
        titre: "Emprise logement",
        contenu: "Il faut prévoir un encombrement d'environ 60x60x250 cm.",
      },
    ],
  },
  acoustique: {
    note: "C",
    text: [
      {
        titre: "Volume sonore",
        contenu: "de 45 à 65dB (unité extérieure) / de 30 à 50dB (unité intérieure)",
      },
      {
        titre: "Acoustique",
        contenu:
          "Il faut prévoir un éventuel traitement acoustique du module extérieur (surtout si positionné sur le balcon). Le module intérieur a une puissance acoustique faible, il peut être intégré en cuisine.",
      },
    ],
  },
  espaceExterieur: {
    note: "D",
    text: [
      {
        titre: "Unité extérieure",
        contenu: "Les PAC air / air disposent d’une unité extérieure (balcon, toiture ou terrasse).",
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
    note: "C",
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;

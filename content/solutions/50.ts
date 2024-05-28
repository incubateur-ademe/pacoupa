import { type Solution } from "@/lib/enums";

export const solution = {
  id: "50",
  nom: "Pompe à chaleur air / eau (avec unité extérieure)",
  familleSolution: "PAC Air-Eau",
  type: "IND",
  description:
    "La pompe à chaleur (PAC) air / eau prélève de la chaleur dans l'air extérieur, augmente son niveau de température et la transfère à un circuit d'eau.",
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Possible",
  environnement: {
    note: "A",
    text: [
      {
        titre: "Consommation d’énergie",
        contenu:
          "La pompe à chaleur utilise une énergie décarbonée (l’électricité). Son rendement est, en moyenne, trois fois supérieur à celui d’un radiateur électrique ou d’une chaudière.",
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
    text: [
      {
        titre: "Déroulement des travaux",
        contenu: "Travaux rapides dans des parties communes peu fréquentées.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    image: "50 - PAC air eau avec unite ext - appartement.png",
    text: [
      {
        titre: "Emprise logement",
        contenu: "Il faut prévoir un encombrement d'environ 60x60x250 cm.",
      },
      {
        titre: "Déroulement des travaux",
        contenu:
          "Il est nécessaire d’installer une unité intérieure, ainsi qu’une unité extérieure qui peut idéalement être installée en toiture - pour limiter les contraintres acoustiques - ou sur les balcons de l’appartement.",
      },
    ],
  },
  acoustique: {
    note: "C",
    text: [
      {
        titre: "Volume sonore",
        contenu: "de 45 à 65dB (unité extérieure) / de 50 à 65dB (unité intérieure)",
      },
      {
        titre: "Acoustique unité extérieure",
        contenu:
          "Le bruit d’une PAC est couvert par les bruits ambiants la journée mais peut être gênant la nuit si l’unité est trop proche des chambres. Il existe des solutions pour diminuer l’impact sonore des unités extérieures.",
      },
      {
        titre: "Acoustique unité intérieure",
        contenu: "Le module intérieur a une puissance acoustique faible, il peut être intégré en cuisine.",
      },
    ],
  },
  espaceExterieur: {
    note: "D",
    image: "50 - PAC air eau - impact exterieur.png",
    text: [
      {
        titre: "Unité extérieure",
        contenu: "Les PAC air / eau disposent d’une unité extérieure (toiture, jardin ou balcon).",
      },
      {
        titre: "Emprise des PAC",
        contenu: "Assurez-vous que la place est suffisante en extérieur (voir la surface estimée).",
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
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;

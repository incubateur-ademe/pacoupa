import { type Solution } from "@/lib/common/domain/values/Solution";

export const solution = {
  id: "11",
  nom: "Pompe à chaleur air / eau (gainée)",
  familleSolution: "PAC Air-Eau",
  type: "COL",
  typeSysteme: "CH + ECS : PAC Air / Eau",
  description:
    "La pompe à chaleur (PAC) air / eau prélève de la chaleur dans l'air extérieur, augmente son niveau de température et la transfère à un circuit d'eau.",
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Possible",
  environnement: {
    note: "A",
    texte: [
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
    texte: [
      {
        titre: "Local technique",
        contenu:
          "Assurez-vous que la place est suffisante dans la chaufferie existante ou pour implanter un local technique (voir surface estimée). Il faut également que la PAC soit installée proche de la façade (max 3 m).",
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
    image: "02-11-21 - PAC air eau gainee - parties communes.png",
    texte: [
      {
        titre: "Déroulement des travaux",
        contenu:
          "Travaux rapides dans des parties communes peu fréquentées. La pose d’une PAC gainée nécessite un local commun donnant sur l’extérieur.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    texte: [
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
    note: "C",
    texte: [
      {
        titre: "Volume sonore",
        contenu: "de 45 à 65dB (unité extérieure) / de 50 à 65dB (unité intérieure)",
      },
      {
        titre: "Acoustique",
        contenu:
          "Le bruit d’une PAC est couvert par les bruits ambiants la journée mais peut être gênant la nuit si les bouches en façade sont trop proches des chambres. Il existe des solutions pour diminuer l’impact sonore des bouches en façade. La pose d’une PAC en intérieur permet de réduire ce volume sonore.",
      },
    ],
  },
  espaceExterieur: {
    note: "A",
    texte: [
      {
        titre: "Impact extérieur",
        contenu:
          "La pompe à chaleur est située dans le local technique et est connectée à l’air extérieur par des gaines. Il faut anticiper l’intégration architecturale des bouches en façade.",
      },
      {
        titre: "PLU",
        contenu: "Vérifiez que l’intégration architecturales des bouches en façade est compatible avec le PLU.",
      },
    ],
  },
  maturite: {
    note: "C",
    texte: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;

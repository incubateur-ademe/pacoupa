import { type Solution } from "@/lib/enums";

export const solution = {
  id: "04",
  nom: "Pompe à chaleur sur capteur solaire atmosphérique",
  familleSolution: "PAC Solaire-Eau",
  type: "COL",
  description:
    "La pompe à chaleur (PAC) sur capteur solaire atmosphérique utilise l'énergie solaire pour chauffer un fluide caloporteur, qui est ensuite utilisé pour produire de la chaleur.",
  usageCh: "Non",
  usageEcs: "Oui",
  usageFr: "Non",
  environnement: {
    note: "B",
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
        titre: "Structure",
        contenu:
          "En cas de pose en toiture terrasse, anticipez l’impact des capteurs solaires sur la capacité structurelle de la toiture.",
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
    image: "04 - PAC sur capteur solaire - parties communes.png",
    text: [
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
    note: "C",
    image: "04 - PAC sur capteur solaire - impact exterieur.png",
    text: [
      {
        titre: "Capteurs solaires",
        contenu: "Assurez-vous que la place pour les capteurs solaires est suffisante (généralement en toiture).",
      },
      {
        titre: "Structure",
        contenu:
          "En cas de pose en toiture terrasse, anticipez l’impact des capteurs solaires sur la capacité structurelle de la toiture.",
      },
      {
        titre: "PLU",
        contenu: "Vérifiez que l'installation est compatible avec le PLU (notamment l'impact visuel des capteurs).",
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

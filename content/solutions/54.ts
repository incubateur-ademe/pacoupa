import { type Solution } from "@/lib/enums";

export const solution = {
  id: "54",
  nom: "Pompe à chaleur air / eau avec chauffage par l’air",
  familleSolution: "PAC Air-Eau",
  type: "IND",
  typeSysteme: "CH + ECS : PAC Air / Eau",
  description:
    "La pompe à chaleur (PAC) air / eau capte de la chaleur sur l’air extérieur, produit de l’eau chaude et chauffe (ou refroidit) l'air intérieur.",
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
        titre: "Aucun travaux sur parties communes",
        contenu:
          "Une PAC est présente dans chaque logement, étant composée d’un seul bloc intégrant une pompe à chaleur et un ballon de stockage ECS. Ce bloc doit être raccordé à l’air extérieur par des bouches en façade ou un conduit collectif.",
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
    image: "54 - CET air eau avec chauffage par air - parties communes.png",
    text: [
      {
        titre: "Travaux à prévoir",
        contenu:
          "Aucun si le raccordement à l’air extérieur se fait via des bouches en façade. Sinon, il faut prévoir le raccordement à un conduit collectif.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    text: [
      {
        titre: "Emprise logement",
        contenu: "Il faut prévoir un encombrement d'environ 70x70x250 cm (placard acoustique).",
      },
      {
        titre: "Déroulement des travaux",
        contenu:
          "Il est nécessaire d’installer une unité intérieure composée d’un seul bloc, intégrant une pompe à chaleur et un ballon de stockage ECS. La PAC est raccordée et prélève les calories sur l’air extérieur grâce à des bouches en façade ou un conduit collectif.",
      },
    ],
  },
  acoustique: {
    note: "C",
    text: [
      {
        titre: "Volume sonore",
        contenu: "de 45 à 65dB",
      },
      {
        titre: "Acoustique",
        contenu:
          "Il est préconisé de mettre la PAC dans un placard acoustique pour éviter toute gêne, et de ne pas le positionner sur des cloisons mitoyennes de chambre.",
      },
    ],
  },
  espaceExterieur: {
    note: "B",
    text: [
      {
        titre: "Impact extérieur",
        contenu:
          "Il n’y a pas d’unité extérieure, simplement une bouche en façade (si le raccordement est ainsi fait). Dans ce cas, il faut anticiper l’intégration architecturale des bouches en façade.",
      },
      {
        titre: "PLU",
        contenu: "Vérifiez que l’intégration architecturales des bouches en façade est compatible avec le PLU.",
      },
    ],
  },
  maturite: {
    note: "D",
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;

import { type Solution } from "@/lib/common/domain/values/Solution";

export const solution = {
  id: "53",
  nom: "Pompe à chaleur air extrait / eau",
  familleSolution: "PAC Air-Eau",
  type: "IND",
  typeSysteme: "CH + ECS : PAC Air / Eau",
  description:
    "La pompe à chaleur (PAC) air extrait / eau capte de la chaleur sur l'air extrait de ventilation, et produit de l'eau chaude.",
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
        titre: "Aucun travaux sur parties communes",
        contenu:
          "Une PAC est présente dans chaque logement, étant composée d’un seul bloc intégrant une pompe à chaleur et un ballon de stockage ECS. Ce bloc doit être raccordé à l’air extérieur via la ventilation mécanique.",
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
    image: "53 - PAC sur air extrait - NIBE - appartement.png",
    texte: [
      {
        titre: "Emprise logement",
        contenu: "Il faut prévoir un encombrement d'environ 70x70x250 cm (placard acoustique).",
      },
      {
        titre: "Déroulement des travaux",
        contenu:
          "Il est nécessaire d’installer une unité intérieure composée d’un seul bloc, intégrant une pompe à chaleur et un ballon de stockage ECS. La PAC est raccordée et prélève les calories sur l’air extrait par la ventilation mécanique.",
      },
    ],
  },
  acoustique: {
    note: "C",
    texte: [
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
    texte: [
      {
        titre: "Impact extérieur",
        contenu:
          "Il n’y a pas d’unité extérieure, simplement une bouche en façade. La pompe à chaleur est reliée à l’air extrait par la ventilation mécanique. Il faut anticiper l’intégration architecturale des bouches en façade.",
      },
      {
        titre: "PLU",
        contenu: "Vérifiez que l’intégration architecturales des bouches en façade est compatible avec le PLU.",
      },
    ],
  },
  maturite: {
    note: "D",
    texte: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;

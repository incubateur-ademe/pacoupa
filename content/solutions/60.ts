import { type Solution } from "@/lib/enums";

export const solution = {
  id: "60",
  nom: "Pompe à chaleur sur boucle d’eau",
  familleSolution: "PAC Eau-Eau",
  type: "MIX",
  typeSysteme: "CH + ECS : PAC Air / Eau",
  description:
    "La pompe à chaleur (PAC) eau / eau individuelle capte de la chaleur dans la boucle d'eau collective, et produit de l'eau chaude.",
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
        titre: "Solution individuelle couplée à une solution collective",
        contenu:
          "Une PAC eau-eau est présente dans chaque logement pour fournir du chauffage et de l’Eau Chaude Sanitaire (ECS). Cette PAC individuelle est raccordée sur une boucle d’eau collective alimentée par une PAC collective (ou une autre source : chauffage urbain, géothermie…).",
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
    text: [
      {
        titre: "Déroulement des travaux",
        contenu:
          "Les travaux varient en fonction de la source de chauffage pour la boucle d’eau collective (PAC collective, chauffage urbain, géothermie, etc.). Il est conseillé d’installer la PAC collective en toiture ou dans le jardin. Un local technique est associé à la PAC collective, il abrite notamment la régulation et les éventuels ballons primaires.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    image: "60 - PAC indiv sur BET - PAC indiv - appartement.png",
    text: [
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
    text: [
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
    note: "C",
    image: "60 - PAC indiv sur BET - PAC coll - impact exterieur.png",
    text: [
      {
        titre: "Unité extérieure",
        contenu:
          "Certaines solutions pour le circuit d’eau collectif nécessitent une unité extérieure, d’autres non. Les PAC air / eau disposent d’une unité extérieure (posées sur le sol, en toiture, jardin ou terrasse), les PAC eau / eau en géothermie n’ont pas d’unité extérieure apparente.",
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
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;

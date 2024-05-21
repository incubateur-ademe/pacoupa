import { type Solution } from "@/lib/enums";

export const solution = {
  id: "25",
  nom: "Hybride pompe à chaleur + chaudière",
  familleSolution: "Hybride PAC + Chaudière",
  type: "COL",
  description: "La solution hybride combine une pompe à chaleur (PAC) avec une chaudière pour assurer l'appoint.",
  usageCh: "Oui",
  usageEcs: "Non",
  usageFr: "Possible",
  environnement: {
    note: "C",
    text: [
      {
        titre: "Combiner PAC et chaudière",
        contenu:
          "La solution hybride permet d’avoir une pompe à chaleur de petite puissance, qui est complétée en cas de besoin par une chaudière. Cela peut être très pertinent si votre chaudière est encore pleinement opérationnelle, ou si votre bâtiment impose des contraintes trop fortes pour fonctionner à 100% avec une pompe à chaleur.",
      },
      {
        titre: "Bénéfice variable",
        contenu:
          "Le bénéfice environnemental dépend du taux d’hybridation : c’est la proportion d'énergie fournie par la pompe à chaleur par rapport à celle fournie par la chaudière à gaz. Plus le taux de couverture de la pompe à chaleur est important (c’est-à-dire que l’énergie produite vient de la PAC), meilleur sera le bénéfice environnemental.",
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
          "En cas de pose en toiture-terrasse, anticipez l’impact des PAC sur la capacité structurelle de la toiture.",
      },
      {
        titre: "Raccordement électrique",
        contenu: "Anticipez l’impact sur la puissance de raccordement électrique.",
      },
      {
        titre: "Réseaux hydrauliques",
        contenu:
          "Nettoyage et isolation des réseaux chauffage à prévoir pour optimiser la performance de l’installation.",
      },
    ],
  },
  travauxCollectif: {
    note: "dynamic",
    image: "05-15-25 - Hybride PAC + chaudiere - parties communes.png",
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
    note: "C",
    text: [
      {
        titre: "Volume sonore",
        contenu: "De 45 à 65dB (unité extérieure) / de 50 à 65dB (unité intérieure)",
      },
      {
        titre: "Acoustique",
        contenu:
          "Le bruit d’une PAC est couvert par les bruits ambiants la journée mais peut être gênant la nuit si l’unité est trop proche des chambres. Il existe des solutions pour diminuer l’impact sonore des unités extérieures.",
      },
    ],
  },
  espaceExterieur: {
    note: "C",
    image: "05-15-25 - Hybride PAC + chaudiere - impact exterieur.png",
    text: [
      {
        titre: "Unité extérieure",
        contenu: "Les PAC air / eau disposent d’une unité extérieure (sol, toiture, jardin ou terrasse).",
      },
      {
        titre: "Emprise des PAC",
        contenu: "Assurez-vous que la place est suffisante en extérieur (voir la surface estimée).",
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
    note: "B",
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;

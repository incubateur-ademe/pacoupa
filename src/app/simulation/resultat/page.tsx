import { Base64 } from "js-base64";
import { z } from "zod";

import { type CriteriaPayloadSchema } from "@/app/api/solutions-par-criteres/route";
import { H1 } from "@/dsfr/base/typography";

type CriteriaPayload = z.infer<typeof CriteriaPayloadSchema>;

const createPayload = (data: z.infer<typeof schema>) => {
  const emetteur: CriteriaPayload["emetteur"] = data.emetteur === "radiateurs" ? "electrique" : "hydraulique";

  const envContraint: CriteriaPayload["envContraint"] =
    data.espacesExterieursCommuns?.includes("jardin") || data.espacesExterieursCommuns?.includes("parking exterieur")
      ? "terrain disponible"
      : "contraint";

  const espaceExterieur: CriteriaPayload["espaceExterieur"] =
    data.typeCH === "individuel" && data.typeECS === "individuel"
      ? data.espacesExterieursPersonnels?.includes("balcon")
        ? "oui"
        : "non"
      : "NA";

  const toitureTerrasse: CriteriaPayload["toitureTerrasse"] =
    envContraint === "contraint"
      ? data.espacesExterieursCommuns?.includes("toit terrasse") ||
        data.espacesExterieursPersonnels?.includes("toit terrasse")
        ? "toiture t"
        : "sans tt"
      : "NA";

  const temperature: CriteriaPayload["temperature"] =
    data.emetteur === "plancher chauffant" ? "< 40°C" : data.renovation === "rénovation globale" ? "40-60°C" : "> 60°C";

  const payload: CriteriaPayload = {
    ch: data.typeECS === "collectif" ? "col" : "ind",
    ecs: data.typeECS === "collectif" ? "col" : "ind",
    emetteur,
    envContraint,
    espaceExterieur,
    toitureTerrasse,
    temperature,
    nbLgts: data.nbLogements < 15 ? "< 15" : ">= 15",
    niveauRenovation:
      data.annee === "post-1990" || data.renovation === "rénovation globale" ? "recent ou renove" : "NA",
  };
};

// TODO: est-ce important de valider avec les domaines de valeurs ? ex: renovation ne peut avoir que 3 valeurs précises.
const schema = z.object({
  adresse: z.string().min(1, "L'adresse est obligatoire"),
  // annee: z.string({ required_error: "L'année du bâtiment est obligatoire" }),
  annee: z.enum(["pre-1945", "1946-1974", "1975-1989", "post-1990"]),
  renovation: z.enum(["aucune rénovation", "rénovations partielles", "rénovation globale"]),
  nbLogements: z.coerce
    .number({
      invalid_type_error: "Le nombre de logements doit être un nombre",
    })
    .min(1, "Le nombre de logements est obligatoire et supérieur à zéro"),
  typeCH: z.enum(["individuel", "collectif"]),
  energieChauffage: z.enum(["fioul", "gaz", "electricite"]),
  emetteur: z.enum(["radiateurs", "plancher chauffant"]),
  typeECS: z.enum(["individuel", "collectif"]),
  energieECS: z.enum(["fioul", "gaz", "ballon electrique"]),
  espacesExterieursCommuns: z.array(z.enum(["jardin", "parking exterieur", "toit terrasse", "autres"])).optional(),
  espacesExterieursPersonnels: z.array(z.enum(["balcon", "toit terrasse", "autres"])).optional(),
});

const ResultatsPage = ({ searchParams }: { searchParams: { hash: string } }) => {
  // const payload = createPayload();

  const validation = schema.safeParse(JSON.parse(Base64.decode(searchParams.hash)));

  if (!validation.success) {
    const errors = validation.error.format();

    throw new Error(`Erreur de formatage du hash ${JSON.stringify(errors)}`);
  }

  return (
    <>
      <H1>Résulats de la simulation</H1>
      <p>Voici les solutions applicables à votre situations :</p>
      <pre>{JSON.stringify(validation.data, null, 2)}</pre>
    </>
  );
};

export default ResultatsPage;

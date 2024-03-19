import { db } from "@/lib/db";

export const dynamic = "force-dynamic"; // defaults to auto

// const sql = (CH: string) =>
//   `select emetteur, solution, espace_exterieur, environnement, toiture_terrasse, temperature, nb_lgts, niveau_renovation, difficulte, impact_travaux_coll, impact_travaux_indiv, cout, type_solution, usage_CH, usage_ECS, usage_FR, ordre_solution \
//   from simu1 where CH = '${CH}' and ECS = 'IND' and emetteur <> 'Hydraulique' and (niveau_renovation = 'Recent ou renove' or niveau_renovation = 'NA') and (nb_lgts = '> 15' or nb_lgts = 'NA') order by ordre_solution`;

const sql = (CH: string) =>
  `select solution, emetteur, CH, ECS
  from simu1 where CH = '${CH}' order by solution`;

// const SimuPage = ({ params }: { params: { CH: string } }) => {
export function GET(request: Request, { params }: { params: { CH: string } }) {
  console.log("params", params.CH);
  // const { rows } = await turso.execute("SELECT * FROM simu1");
  const rows = db.prepare(sql(params.CH)).all();

  return Response.json({ rows });
}

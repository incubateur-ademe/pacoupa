import { turso } from "@/lib/turso";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const sql =
  "select solution, espace_exterieur, environnement, toiture_terrasse, temperature, nb_lgts, niveau_renovation, difficulte, impact_travaux_coll, impact_travaux_indiv, cout, type_solution, usage_CH, usage_ECS, usage_FR, ordre_solution \
from simu1 where CH = 'IND' and ECS = 'IND' and emetteur = 'Hydraulique' and temperature = 'Superieur à 60°C' and (niveau_renovation = 'Recent ou renove' or niveau_renovation = 'NA') and (nb_lgts = '> 15' or nb_lgts = 'NA') order by ordre_solution";

const Page = async () => {
  // const { rows } = await turso.execute("SELECT * FROM simu1");
  const { rows } = await turso.execute(sql);

  return (
    <>
      <strong>Nb rows: {rows.length}</strong>
      <ul>
        {rows.map((row, index) => (
          <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </>
  );
};

export default Page;

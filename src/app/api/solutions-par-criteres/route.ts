import { getSolutionParTypologie } from "@/lib/server/useCases/getSolutionsParTypologie/getSolutionsParTypologie";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * Get all solutions that match the criteres.
 *
 * NB: this is a POST request because the body is used to send the payload.
 */
export async function POST(request: Request) {
  // const res = CriteriaPayloadSchema.safeParse(await request.json());
  // const res = simulationSchema.safeParse(await request.json());

  const res = getSolutionParTypologie(await request.json());

  // if (!res.success) {
  //   return Response.json({ error: res.error });
  // }

  // console.log("body", JSON.stringify(res, null, 2));

  // const criteresHelper = createCriteria(res.data);

  // console.log("criteresHelper", JSON.stringify(criteresHelper, null, 2));

  // const rows = await db
  //   .select()
  //   .from(criteres)
  //   .innerJoin(solutionsParCriteres, eq(criteres.id, solutionsParCriteres.criteresId))
  //   .innerJoin(solutions, eq(solutionsParCriteres.solutionsId, solutions.id))
  //   .where(buildWhereClause(criteresHelper))
  //   .all();

  return Response.json(res);
}

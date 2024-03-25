import { caracteristiques } from "drizzle/schema";
import { type Column, eq, sql } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/lib/drizzle";

export const dynamic = "force-dynamic"; // defaults to auto

const OuiNonSchema = z.enum(["Oui", "Non"]).optional();

const selectCaracteristiquesSchema = createSelectSchema(caracteristiques, {
  id: schema => schema.id.optional(),
  ch: z.enum(["IND", "COL"]).optional(),
  ecs: z.enum(["IND", "COL"]).optional(),
  emetteur: z.enum(["Hydraulique", "Electrique"]).optional(),
  envContraint: z.enum(["Terrain disponible", "Contraint"]).optional(),
  espaceExterieur: OuiNonSchema,
  toitureTerrasse: z.enum(["Sans TT", "Toiture T"]).optional(),
  nbLgts: z.enum(["< 15", "> 15"]).optional(),
  niveauRenovation: z.enum(["Recent ou renove"]).optional(),
  temperature: schema => schema.temperature.optional(), // TODO: changer les valeurs dans le google sheet
});

const buildCondition = (column: Column, value: number | string) => {
  return sql`${column} = ${value}`;
};

export async function POST(request: Request) {
  const res = selectCaracteristiquesSchema.safeParse(await request.json());

  if (!res.success) {
    return Response.json({ error: res.error });
  }

  console.log("body", JSON.stringify(res, null, 2));

  let rows;

  const conditions = Object.keys(res.data)
    .map(key => {
      if (res.data[key as keyof typeof res.data]) {
        return buildCondition(key as unknown as Column, res.data[key as keyof typeof res.data] as string);
      } else {
        return null;
      }
    })
    .filter(Boolean)
    .join(" AND ");

  console.log("conditions", conditions);

  if (res.data.ch) {
    rows = await db.select().from(caracteristiques).where(eq(caracteristiques.ch, res.data.ch)).all();
  } else {
    rows = await db.select().from(caracteristiques).all();
  }

  return Response.json({ data: rows, nbRows: rows.length });
}

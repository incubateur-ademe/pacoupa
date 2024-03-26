import { Table } from "@codegouvfr/react-dsfr/Table";
import { solutions } from "drizzle/schema";

import { Container } from "@/dsfr";
import { db } from "@/lib/drizzle";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Page = async () => {
  const rows = await db.select().from(solutions).all();

  return (
    <Container>
      <h1>Liste des solutions</h1>

      <strong>{rows.length} solutions</strong>
      <Table
        headers={[
          "Id",
          "Nom solution",
          "Usage chauffage",
          "Usage ECS",
          "Usage froid",
          "Note environnemental",
          "Note impact espace extérieur",
          "Note impact sonore",
          "Note impact visuel",
          "Note maturité",
        ]}
        data={rows.map(row => [
          row.id,
          row.name,
          row.usageCh,
          row.usageEcs,
          row.usageFr,
          row.noteEnvironnemental,
          row.noteImpactEspaceExterieur,
          row.noteImpactSonore,
          row.noteImpactVisuel,
          row.noteMaturite,
        ])}
      />
    </Container>
  );
};

export default Page;

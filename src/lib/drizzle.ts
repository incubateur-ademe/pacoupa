import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "libsql-stateless-easy";

import { config } from "@/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
  fetch,
});

export const db = drizzle(client, { logger: config.env !== "prod" });
// export const db = drizzle(client, { logger: false });

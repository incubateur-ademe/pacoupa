import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "libsql-stateless-easy";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
  fetch,
});

// export const db = drizzle(client, { logger: config.env !== "prod" });
export const db = drizzle(client, { logger: false });

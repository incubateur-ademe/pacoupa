import { createClient } from "@libsql/client";
// import { createClient } from "@libsql/client/web";

export const turso = createClient({
  url: "file:pacoupa.db",
  // url: process.env.TURSO_DATABASE_URL!,
  // authToken: process.env.TURSO_AUTH_TOKEN,
});

import { type Config } from "drizzle-kit";

// eslint-disable-next-line import/no-default-export
export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;

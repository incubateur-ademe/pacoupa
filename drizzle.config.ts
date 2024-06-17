import { defineConfig } from "drizzle-kit";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  dialect: "sqlite", // "postgresql" | "mysql"
  driver: "turso", // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});

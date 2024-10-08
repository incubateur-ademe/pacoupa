import { readFileSync } from "fs";
import { $ } from "zx";

import { typologiesZodSchema } from "../../drizzle/schema.js";

// const xx = require("zx");

console.log("Validate typologies.csv --------------------");

await $`sqlite-utils memory ${process.env.ASSETS_DIR}/typologies.csv "select * from typologies_clean" > typologies.json`;

const schema = typologiesZodSchema;

// const schema = z.object({})

// parse the json file with the schema
const rawData = readFileSync("typologies.json");

const result = schema.safeParse(JSON.parse(rawData.toString()));

if (result.success) {
  console.log("Success");
  await $`rm typologies.json`;
} else {
  console.log("Error", result.error);
}

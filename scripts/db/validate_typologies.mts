import { $ } from "zx";
import { z } from "zod";
import { readFileSync } from "fs";

console.log("Validate typologies.csv --------------------");

await $`sqlite-utils memory ${process.env.ASSETS_DIR}/typologies.csv "select * from typologies_clean" > typologies.json`;

// const schema = typologiesZodSchema;

const schema = z.object({})

// parse the json file with the schema
const rawData = readFileSync("typologies.json");

const result = schema.safeParse(JSON.parse(rawData.toString()));

if (result.success) {
    console.log("Success");
    await $`rm typologies.json`;
} else {
    console.log("Error", result.error);
}


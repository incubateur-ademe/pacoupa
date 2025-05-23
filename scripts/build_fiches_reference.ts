import fs from "fs";
import path from "path";

const solutionsDir = path.join(__dirname, "../content/fiches-reference");
const outputFilePath = path.join(__dirname, "../content/fiches-reference/index.ts");

const buildCatalogue = () => {
  const files = fs.readdirSync(solutionsDir);
  const imports: string[] = [];
  const catalogueEntries: string[] = [];

  files
    .filter(file => /^\d+_\d+\.ts$/.test(file))
    .forEach(file => {
      const ficheId = file.replace(".ts", "");
      const importName = `ficheReference${ficheId}`;
      // export { ficheReference as ficheReference07 } from "./07";
      imports.push(`import { ficheReference as ${importName} } from "./${ficheId}";`);
      catalogueEntries.push(`  "${ficheId}": ${importName},`);
    });

  const output = `// This file is generated by yarn build_fiches_reference. Run it again when fiches are added or removed.
import { type FicheReference } from "@/lib/common/domain/values/FicheReference";
${imports.join("\n")}

export const fichesReference = {
${catalogueEntries.join("\n")}
} as Record<string, FicheReference>;
`;

  fs.writeFileSync(outputFilePath, output);
};

try {
  buildCatalogue();
} catch (error) {
  console.error("Error building fiches reference:", error);
  process.exit(1);
}

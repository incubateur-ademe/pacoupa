import fs from "fs";
import path from "path";

const solutionsDir = path.join(__dirname, "../content/solutions");
const outputFilePath = path.join(__dirname, "../content/solutions/index.ts");

const buildCatalogue = () => {
  const files = fs.readdirSync(solutionsDir);
  const imports: string[] = [];
  const catalogueEntries: string[] = [];

  files
    .filter(file => /^\d+\.ts$/.test(file))
    .forEach(file => {
      const solutionId = file.replace(".ts", "");
      const importName = `solution${solutionId}`;
      imports.push(`import { solution as ${importName} } from "./${solutionId}";`);
      catalogueEntries.push(`  "${solutionId}": ${importName},`);
    });

  const output = `// This file is generated by yarn build_catalogue. Run it again when solutions are added or removed.
${imports.join("\n")}

export const catalogueSolutions = {
${catalogueEntries.join("\n")}
} as const;
`;

  fs.writeFileSync(outputFilePath, output);
};

try {
  buildCatalogue();
} catch (error) {
  console.error("Error building catalogue:", error);
  process.exit(1);
}
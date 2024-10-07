import fs from "fs";
import path from "path";

const solutionsDir = path.join(__dirname, "../content/solutions");
const outputFilePath = path.join(__dirname, "../content/solutions/catalogueSolutions.ts");

const buildCatalogue = () => {
  const files = fs.readdirSync(solutionsDir);
  const imports: string[] = [];
  const catalogueEntries: string[] = [];

  files
    .filter(file => /^\d+\.ts$/.test(file))
    .forEach(file => {
      const solutionId = file.replace(".ts", "");
      const importName = `solution${solutionId}`;
      imports.push(`import {solution as ${importName}} from "../solutions/${solutionId}";`);
      catalogueEntries.push(`  "${solutionId}": ${importName},`);
    });

  const output = `
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

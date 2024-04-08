import { z } from "zod";

export const OuiNonSchema = z.enum(["Oui", "Non"]);

export const OuiNonLabels = ["Oui", "Non"] as const;

import { type Solution } from "@/lib/enums";

import { solution as solution30 } from "./30";
import { solution as solution32 } from "./32";
import { solution as solution51 } from "./51";

export const catalogueSolutions: Record<string, Solution> = {
  "51": solution51,
  "30": solution30,
  "32": solution32,
};

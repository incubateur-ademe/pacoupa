import { enumFamilles, enumNotes, enumTypes, enumUsages } from "@/lib/enums";

export const drizzleEnumNotes = { enum: enumNotes } as const;

export const drizzleEnumUsages = { enum: enumUsages } as const;

export const drizzleEnumTypes = { enum: enumTypes } as const;

export const drizzleEnumFamilles = { enum: enumFamilles } as const;

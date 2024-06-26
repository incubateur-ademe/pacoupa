export const enumNbLogement = ["NA", "< 15", ">= 15"] as const;

export type NbLogement = (typeof enumNbLogement)[number];

export const enumEmetteur = ["Hydraulique", "Electrique"] as const;

export type Emetteur = (typeof enumEmetteur)[number];

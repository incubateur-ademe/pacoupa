export const enumTypeSystemeWithoutRCU = [
  "CH + ECS : PAC Air / Eau",
  "CH + ECS Hybride : PAC + Chaudière",
  "CH seul : PAC Air / Eau",
  "CH seul Hybride : PAC + Chaudière",
  "ECS seule : PAC Air / Eau",
  "ECS seule Hybride : PAC + chaudière",
] as const;

export type TypeSystemeWithoutRCU = (typeof enumTypeSystemeWithoutRCU)[number];

export const enumTypeSysteme = ["RCU", ...enumTypeSystemeWithoutRCU] as const;

export type TypeSysteme = (typeof enumTypeSysteme)[number];

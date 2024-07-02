export const enumGesteIsolation = ["fenetres", "sol", "toiture", "murs"] as const;

export type GesteIsolation = (typeof enumGesteIsolation)[number];

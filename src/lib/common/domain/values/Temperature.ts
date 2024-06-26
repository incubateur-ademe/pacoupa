export const enumTemperature = ["> 60°C", "NA", "40-60°C", "< 40°C"] as const;

export type Temperature = (typeof enumTemperature)[number];

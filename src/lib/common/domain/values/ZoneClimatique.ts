export const enumZoneClimatique = ["75 - Paris", "34 - Herault", "36 - Indre"] as const;

export type ZoneClimatique = (typeof enumZoneClimatique)[number];

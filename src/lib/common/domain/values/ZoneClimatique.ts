export const enumZoneClimatique = ["75 - Paris"] as const;

export type ZoneClimatique = (typeof enumZoneClimatique)[number];

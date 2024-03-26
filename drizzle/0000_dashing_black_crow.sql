-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `solutions` (
	`id` text PRIMARY KEY,
	`name` text,
	`type` text,
	`usage_CH` text,
	`usage_ECS` text,
	`usage_FR` text,
	`num_AFPAC` text,
	`emprise_PAC_exterieur` text,
	`local_technique` text,
	`emprise_logement` text,
	`structure` text,
	`acoustique` text,
	`reseaux_hydrauliques` text,
	`PLU` text,
	`raccordement_electrique` text,
	`impact_visuel` text,
	`note_impact_visuel` text,
	`note_Impact_sonore` text,
	`note_impact_espace_exterieur` text,
	`note_environnemental` text,
	`note_maturite` text,
	`commentaire_app` text,
	`commentaire_pouget` text
);
--> statement-breakpoint
CREATE TABLE `caracteristiques` (
	`id` integer PRIMARY KEY,
	`CH` text,
	`ECS` text,
	`emetteur` text,
	`espace_exterieur` text,
	`env_contraint` text,
	`toiture_terrasse` text,
	`temperature` text,
	`nb_lgts` text,
	`niveau_renovation` text
);
--> statement-breakpoint
CREATE TABLE `solutions_par_cas` (
	`caracteristiques_id` integer,
	`id_solution` text,
	`ordre_solution` integer,
	`difficulte` text,
	`impact_travaux_coll` text,
	`impact_travaux_indiv` text,
	`cout` text,
	`type_solution` text,
	`usage_CH` text,
	`usage_ECS` text,
	`usage_FR` text,
	`alertes` integer,
	FOREIGN KEY (`id_solution`) REFERENCES `solutions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`caracteristiques_id`) REFERENCES `caracteristiques`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_caracteristiques_CH_ECS_emetteur_espace_exterieur_env_contraint_toiture_terrasse_temperature_nb_lgts_niveau_renovation` ON `caracteristiques` (`CH`,`ECS`,`emetteur`,`espace_exterieur`,`env_contraint`,`toiture_terrasse`,`temperature`,`nb_lgts`,`niveau_renovation`);
*/
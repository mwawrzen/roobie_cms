ALTER TABLE `user_prjects` RENAME TO `user_projects`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_projects` (
	`user_id` integer NOT NULL,
	`project_id` integer NOT NULL,
	`role` text DEFAULT 'EDITOR' NOT NULL,
	PRIMARY KEY(`user_id`, `project_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_projects`("user_id", "project_id", "role") SELECT "user_id", "project_id", "role" FROM `user_projects`;--> statement-breakpoint
DROP TABLE `user_projects`;--> statement-breakpoint
ALTER TABLE `__new_user_projects` RENAME TO `user_projects`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
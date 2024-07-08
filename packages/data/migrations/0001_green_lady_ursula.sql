CREATE TABLE `organizationMemberships` (
	`id` text(12) PRIMARY KEY NOT NULL,
	`userId` text(12) NOT NULL,
	`organizationId` text(12) NOT NULL,
	`imageUrl` text,
	`role` text NOT NULL,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`organizationId`) REFERENCES `organziations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `organziations` (
	`id` text(12) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`tagline` text(128) DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`imageUrl` text,
	`createdById` text(12),
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `userAuthenicateAttempts` (
	`id` text(12) PRIMARY KEY NOT NULL,
	`userId` text(12) NOT NULL,
	`factorAttempt` text NOT NULL,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
/*
 SQLite does not support "Changing existing column type" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/
/*
 SQLite does not support "Set not null to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/
ALTER TABLE users ADD `firstName` text;--> statement-breakpoint
ALTER TABLE users ADD `lastName` text;--> statement-breakpoint
ALTER TABLE users ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE users ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE users ADD `imageUrl` text;--> statement-breakpoint
ALTER TABLE users ADD `defaultOrganization` text(12) REFERENCES organziations(id);--> statement-breakpoint
ALTER TABLE users ADD `status` text;--> statement-breakpoint
ALTER TABLE users ADD `createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `organizationMemberships_userId_organizationId_unique` ON `organizationMemberships` (`userId`,`organizationId`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/
ALTER TABLE `users` DROP COLUMN `text_modifiers`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `int_modifiers`;
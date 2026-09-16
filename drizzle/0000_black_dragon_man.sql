CREATE TABLE `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`seed` integer NOT NULL,
	`stage` integer DEFAULT 0 NOT NULL,
	`state` text NOT NULL,
	`score` integer DEFAULT 0 NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`created` text NOT NULL,
	`completed` text
);
--> statement-breakpoint
CREATE INDEX `idx_attempts_email_completed` ON `attempts` (`email`,`completed`);
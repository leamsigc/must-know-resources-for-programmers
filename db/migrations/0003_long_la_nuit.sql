DROP INDEX IF EXISTS "user_email_unique";--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "firstName" TO "firstName" text;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "lastName" TO "lastName" text;
CREATE TABLE `tool` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` text,
	`description` text,
	`likes` integer,
	`tags` text,
	`pricing` text,
	`image_url` text
);

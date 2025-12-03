ALTER TABLE "addresses" ADD COLUMN "neighborhood" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "number" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "complement" varchar(255);
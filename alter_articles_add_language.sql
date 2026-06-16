-- Mavjud articles jadvaliga til ustunini qo'shish (ru/en)
ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "language" VARCHAR NOT NULL DEFAULT 'ru';

UPDATE "articles" SET "language" = 'ru' WHERE "language" IS NULL OR "language" = '';

ALTER TABLE "articles" DROP CONSTRAINT IF EXISTS "articles_slug_key";

CREATE UNIQUE INDEX IF NOT EXISTS "idx_articles_slug_language" ON "articles" ("slug", "language");

CREATE INDEX IF NOT EXISTS "idx_articles_language" ON "articles" ("language");

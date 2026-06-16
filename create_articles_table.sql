-- Articles jadvalini yaratish
CREATE TABLE IF NOT EXISTS "articles" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "language" VARCHAR NOT NULL DEFAULT 'ru',
    "description" TEXT,
    "content" TEXT NOT NULL,
    "image" VARCHAR,
    "metaTitle" VARCHAR,
    "metaDescription" TEXT,
    "published" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS "idx_articles_slug_language" ON "articles" ("slug", "language");
CREATE INDEX IF NOT EXISTS "idx_articles_published" ON "articles" ("published");
CREATE INDEX IF NOT EXISTS "idx_articles_language" ON "articles" ("language");

-- Articles jadvalini yaratish
CREATE TABLE IF NOT EXISTS "articles" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL UNIQUE,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "image" VARCHAR,
    "metaTitle" VARCHAR,
    "metaDescription" TEXT,
    "published" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "idx_articles_slug" ON "articles" ("slug");
CREATE INDEX IF NOT EXISTS "idx_articles_published" ON "articles" ("published");

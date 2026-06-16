-- Articles jadvalini yaratish (faqat jadval; indexlar alter_articles_add_language.sql da)
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

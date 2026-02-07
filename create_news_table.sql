-- News jadvalini yaratish
CREATE TABLE IF NOT EXISTS "news" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "description" TEXT,
    "date" VARCHAR NOT NULL,
    "img" VARCHAR,
    "image" JSONB DEFAULT '[]'::jsonb,
    "fullContent" TEXT,
    "video" VARCHAR
);

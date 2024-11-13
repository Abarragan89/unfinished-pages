/*
  Warnings:

  - You are about to drop the `BlogContentBlock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContentBlockText` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogContentBlock" DROP CONSTRAINT "BlogContentBlock_blogId_fkey";

-- DropForeignKey
ALTER TABLE "ContentBlockText" DROP CONSTRAINT "ContentBlockText_contentBlockId_fkey";

-- DropTable
DROP TABLE "BlogContentBlock";

-- DropTable
DROP TABLE "ContentBlockText";

-- CreateTable
CREATE TABLE "BlogContent" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "BlogContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentBlock" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "bold" BOOLEAN,
    "underline" BOOLEAN,
    "italic" BOOLEAN,
    "contentBlockId" TEXT NOT NULL,

    CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogContent" ADD CONSTRAINT "BlogContent_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_contentBlockId_fkey" FOREIGN KEY ("contentBlockId") REFERENCES "BlogContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

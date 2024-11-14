/*
  Warnings:

  - You are about to drop the column `bold` on the `ContentBlock` table. All the data in the column will be lost.
  - You are about to drop the column `contentBlockId` on the `ContentBlock` table. All the data in the column will be lost.
  - You are about to drop the column `italic` on the `ContentBlock` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `ContentBlock` table. All the data in the column will be lost.
  - You are about to drop the column `underline` on the `ContentBlock` table. All the data in the column will be lost.
  - You are about to drop the `BlogContent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `blogId` to the `ContentBlock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ContentBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BlogContent" DROP CONSTRAINT "BlogContent_blogId_fkey";

-- DropForeignKey
ALTER TABLE "ContentBlock" DROP CONSTRAINT "ContentBlock_contentBlockId_fkey";

-- AlterTable
ALTER TABLE "ContentBlock" DROP COLUMN "bold",
DROP COLUMN "contentBlockId",
DROP COLUMN "italic",
DROP COLUMN "text",
DROP COLUMN "underline",
ADD COLUMN     "blogId" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "url" TEXT;

-- DropTable
DROP TABLE "BlogContent";

-- CreateTable
CREATE TABLE "ContentBlockDetails" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "bold" BOOLEAN,
    "underline" BOOLEAN,
    "italic" BOOLEAN,
    "listType" TEXT,
    "contentBlockId" TEXT NOT NULL,

    CONSTRAINT "ContentBlockDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockDetailsListItems" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "bold" BOOLEAN,
    "underline" BOOLEAN,
    "italic" BOOLEAN,
    "blockDetailsId" TEXT NOT NULL,

    CONSTRAINT "BlockDetailsListItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentBlockDetails" ADD CONSTRAINT "ContentBlockDetails_contentBlockId_fkey" FOREIGN KEY ("contentBlockId") REFERENCES "ContentBlock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockDetailsListItems" ADD CONSTRAINT "BlockDetailsListItems_blockDetailsId_fkey" FOREIGN KEY ("blockDetailsId") REFERENCES "ContentBlockDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

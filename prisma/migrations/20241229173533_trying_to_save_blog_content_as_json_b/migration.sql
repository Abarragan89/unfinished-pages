/*
  Warnings:

  - You are about to drop the `AnchorLinksInListItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlockDetailsListItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContentBlock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContentBlockDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnchorLinksInListItems" DROP CONSTRAINT "AnchorLinksInListItems_parentListItemId_fkey";

-- DropForeignKey
ALTER TABLE "BlockDetailsListItems" DROP CONSTRAINT "BlockDetailsListItems_blockDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "ContentBlock" DROP CONSTRAINT "ContentBlock_blogId_fkey";

-- DropForeignKey
ALTER TABLE "ContentBlock" DROP CONSTRAINT "ContentBlock_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ContentBlockDetails" DROP CONSTRAINT "ContentBlockDetails_contentBlockId_fkey";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "content" JSONB;

-- DropTable
DROP TABLE "AnchorLinksInListItems";

-- DropTable
DROP TABLE "BlockDetailsListItems";

-- DropTable
DROP TABLE "ContentBlock";

-- DropTable
DROP TABLE "ContentBlockDetails";

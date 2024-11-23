/*
  Warnings:

  - You are about to drop the column `keyWords` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `ContentBlock` table. All the data in the column will be lost.
  - Made the column `updatedAt` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "keyWords",
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ContentBlock" DROP COLUMN "url";

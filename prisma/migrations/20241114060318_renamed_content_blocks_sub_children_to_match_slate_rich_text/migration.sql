/*
  Warnings:

  - You are about to drop the column `listType` on the `ContentBlockDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContentBlockDetails" DROP COLUMN "listType",
ADD COLUMN     "type" TEXT;

/*
  Warnings:

  - A unique constraint covering the columns `[displayName]` on the table `BlogCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `BlogCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogCategory" ADD COLUMN     "displayName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_displayName_key" ON "BlogCategory"("displayName");

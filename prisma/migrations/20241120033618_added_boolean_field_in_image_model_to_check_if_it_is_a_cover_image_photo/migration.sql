/*
  Warnings:

  - Added the required column `isBlogCover` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "isBlogCover" BOOLEAN NOT NULL;

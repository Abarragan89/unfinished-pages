/*
  Warnings:

  - You are about to drop the column `pictureURL` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "pictureURL",
ADD COLUMN     "coverPhotoAlt" TEXT,
ADD COLUMN     "coverPhotoURL" TEXT;

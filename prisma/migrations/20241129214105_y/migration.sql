/*
  Warnings:

  - You are about to drop the column `coverPhotoURL` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "coverPhotoURL",
ADD COLUMN     "coverPhotoUrl" TEXT;

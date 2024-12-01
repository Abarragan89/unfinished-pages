/*
  Warnings:

  - You are about to alter the column `title` on the `Blog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(65)`.
  - You are about to alter the column `description` on the `Blog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `coverPhotoAlt` on the `Blog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `text` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `alt` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(320)`.

*/
-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "title" SET DATA TYPE VARCHAR(65),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "coverPhotoAlt" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "text" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "alt" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(320);

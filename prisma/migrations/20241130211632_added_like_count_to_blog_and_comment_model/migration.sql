/*
  Warnings:

  - Added the required column `likeCount` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likeCount` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "likeCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "likeCount" INTEGER NOT NULL;

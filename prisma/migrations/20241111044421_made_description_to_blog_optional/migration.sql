-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "keyWords" DROP NOT NULL,
ALTER COLUMN "isPublished" SET DEFAULT false;

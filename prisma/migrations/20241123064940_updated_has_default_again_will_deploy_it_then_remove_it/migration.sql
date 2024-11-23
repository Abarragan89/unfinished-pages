-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ContentBlock" ADD COLUMN     "url" TEXT;

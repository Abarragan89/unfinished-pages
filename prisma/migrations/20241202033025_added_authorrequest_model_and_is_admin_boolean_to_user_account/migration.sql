-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "AuthorRequest" (
    "id" TEXT NOT NULL,
    "aboutText" VARCHAR(1000) NOT NULL,
    "whyBlogText" VARCHAR(1000) NOT NULL,
    "topicsText" VARCHAR(500) NOT NULL,
    "replyMessage" VARCHAR(500),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthorRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorRequest_userId_key" ON "AuthorRequest"("userId");

-- AddForeignKey
ALTER TABLE "AuthorRequest" ADD CONSTRAINT "AuthorRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

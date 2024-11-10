-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keyWords" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogContentBlock" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "BlogContentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentBlockText" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "bold" BOOLEAN,
    "underline" BOOLEAN,
    "italic" BOOLEAN,
    "contentBlockId" TEXT NOT NULL,

    CONSTRAINT "ContentBlockText_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogContentBlock" ADD CONSTRAINT "BlogContentBlock_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentBlockText" ADD CONSTRAINT "ContentBlockText_contentBlockId_fkey" FOREIGN KEY ("contentBlockId") REFERENCES "BlogContentBlock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

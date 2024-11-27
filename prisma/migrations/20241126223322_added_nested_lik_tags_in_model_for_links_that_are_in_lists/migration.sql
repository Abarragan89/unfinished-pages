-- AlterTable
ALTER TABLE "BlockDetailsListItems" ADD COLUMN     "type" TEXT,
ADD COLUMN     "url" TEXT;

-- CreateTable
CREATE TABLE "AnchorLinksInListItems" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "parentListItemId" TEXT NOT NULL,

    CONSTRAINT "AnchorLinksInListItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnchorLinksInListItems" ADD CONSTRAINT "AnchorLinksInListItems_parentListItemId_fkey" FOREIGN KEY ("parentListItemId") REFERENCES "BlockDetailsListItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

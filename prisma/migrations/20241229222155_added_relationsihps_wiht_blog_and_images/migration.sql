-- CreateTable
CREATE TABLE "_BlogImages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlogImages_AB_unique" ON "_BlogImages"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogImages_B_index" ON "_BlogImages"("B");

-- AddForeignKey
ALTER TABLE "_BlogImages" ADD CONSTRAINT "_BlogImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogImages" ADD CONSTRAINT "_BlogImages_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

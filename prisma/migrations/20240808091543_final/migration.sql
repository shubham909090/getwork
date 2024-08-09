/*
  Warnings:

  - You are about to drop the `_CategoryToJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToJob" DROP CONSTRAINT "_CategoryToJob_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToJob" DROP CONSTRAINT "_CategoryToJob_B_fkey";

-- DropTable
DROP TABLE "_CategoryToJob";

-- CreateTable
CREATE TABLE "JobCategory" (
    "jobId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "JobCategory_pkey" PRIMARY KEY ("jobId","categoryId")
);

-- AddForeignKey
ALTER TABLE "JobCategory" ADD CONSTRAINT "JobCategory_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCategory" ADD CONSTRAINT "JobCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

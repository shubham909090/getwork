/*
  Warnings:

  - You are about to drop the column `status` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `JobCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'PENDING', 'CLOSED');

-- DropForeignKey
ALTER TABLE "JobCategory" DROP CONSTRAINT "JobCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "JobCategory" DROP CONSTRAINT "JobCategory_jobId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "status";

-- DropTable
DROP TABLE "JobCategory";

-- CreateTable
CREATE TABLE "_CategoryToJob" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToJob_AB_unique" ON "_CategoryToJob"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToJob_B_index" ON "_CategoryToJob"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToJob" ADD CONSTRAINT "_CategoryToJob_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToJob" ADD CONSTRAINT "_CategoryToJob_B_fkey" FOREIGN KEY ("B") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

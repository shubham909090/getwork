/*
  Warnings:

  - The `description` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `price` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "longurl" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shorturl" TEXT,
DROP COLUMN "description",
ADD COLUMN     "description" JSONB;

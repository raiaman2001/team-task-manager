-- CreateEnum
CREATE TYPE "SystemRole" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" "SystemRole" NOT NULL DEFAULT 'MEMBER';

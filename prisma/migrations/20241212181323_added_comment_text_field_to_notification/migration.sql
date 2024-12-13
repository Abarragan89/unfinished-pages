-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "commentText" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastNotificationEmailSent" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

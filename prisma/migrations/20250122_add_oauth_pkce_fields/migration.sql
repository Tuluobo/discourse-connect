-- AlterTable
ALTER TABLE "codes" ADD COLUMN "codeChallenge" TEXT,
ADD COLUMN "codeChallengeMethod" TEXT,
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "redirectUri" TEXT,
ADD COLUMN "scopes" TEXT[],
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "used" BOOLEAN NOT NULL DEFAULT false;

-- Update existing rows with default values
UPDATE "codes" SET 
    "redirectUri" = '',
    "scopes" = '{}',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "redirectUri" IS NULL;

-- Make redirectUri required after setting default values
ALTER TABLE "codes" ALTER COLUMN "redirectUri" SET NOT NULL;
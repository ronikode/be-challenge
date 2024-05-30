-- CreateTable
CREATE TABLE "Sprocket" (
    "id" TEXT NOT NULL,
    "teeth" INTEGER NOT NULL,
    "pitchDiameter" INTEGER NOT NULL,
    "outsideDiameter" INTEGER NOT NULL,
    "pitch" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_sprockets_id" PRIMARY KEY ("id")
);

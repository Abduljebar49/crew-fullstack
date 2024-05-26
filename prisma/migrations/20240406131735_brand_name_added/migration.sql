-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

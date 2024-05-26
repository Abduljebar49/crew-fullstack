-- CreateTable
CREATE TABLE "RequestBid" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "bidAmount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RequestBid_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestBid" ADD CONSTRAINT "RequestBid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

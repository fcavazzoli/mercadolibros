-- CreateEnum
CREATE TYPE "ExchangeProposalStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "ExchangeProposal" (
    "id" SERIAL NOT NULL,
    "proposerUserId" INTEGER NOT NULL,
    "askedUserId" INTEGER NOT NULL,
    "proposedBookId" INTEGER NOT NULL,
    "askedBookId" INTEGER NOT NULL,
    "status" "ExchangeProposalStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExchangeProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToExchangeProposal" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExchangeProposalToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToExchangeProposal_AB_unique" ON "_BookToExchangeProposal"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToExchangeProposal_B_index" ON "_BookToExchangeProposal"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExchangeProposalToUser_AB_unique" ON "_ExchangeProposalToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ExchangeProposalToUser_B_index" ON "_ExchangeProposalToUser"("B");

-- AddForeignKey
ALTER TABLE "ExchangeProposal" ADD CONSTRAINT "ExchangeProposal_proposerUserId_proposedBookId_fkey" FOREIGN KEY ("proposerUserId", "proposedBookId") REFERENCES "UserBook"("userId", "bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeProposal" ADD CONSTRAINT "ExchangeProposal_askedUserId_askedBookId_fkey" FOREIGN KEY ("askedUserId", "askedBookId") REFERENCES "UserBook"("userId", "bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToExchangeProposal" ADD CONSTRAINT "_BookToExchangeProposal_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToExchangeProposal" ADD CONSTRAINT "_BookToExchangeProposal_B_fkey" FOREIGN KEY ("B") REFERENCES "ExchangeProposal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExchangeProposalToUser" ADD CONSTRAINT "_ExchangeProposalToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ExchangeProposal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExchangeProposalToUser" ADD CONSTRAINT "_ExchangeProposalToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

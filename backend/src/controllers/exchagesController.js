import { createExchange, findAskedProposalsForUser, findProposalsForUser, getExchageProposaForAskedUser, acceptProposal, rejectProposal } from "../services/prisma/exchanges.js";
import { getUserBook } from "../services/prisma/userBooks.js";

export const proposeExchage = async (req, res) => {
    const { proposerBookId, requestedUserId, requestedBookId } = req.body;
    const { user } = req;
    console.log("Requst Exhange: ", { proposerBookId, userId: user.id, requestedUserId, requestedBookId })

    try {
        const proposerBook = await getUserBook(user.id, proposerBookId);

        if (!proposerBook) {
            return res.status(404).json({ error: "Book not found for proposer user" });
        }

        const requestedBook = await getUserBook(requestedUserId, requestedBookId)

        if (!requestedBook) {
            return res.status(404).json({ error: "Requested book not found for resquestedUserId" })
        }
        const proposal = await createExchange({
            data: {
                proposedBook: {
                    connect: {
                        userId_bookId: {
                            userId: user.id,
                            bookId: proposerBookId
                        }
                    }
                },
                askedBook: {
                    connect: {
                        userId_bookId: {
                            userId: requestedUserId,
                            bookId: requestedBookId
                        }
                    }
                }
            }
        });

        return res.status(200).json({ message: proposal });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getMyProposals = async (req, res) => {
    const { user } = req

    const myProposals = await findProposalsForUser(user.id);

    return res.status(200).json({ message: myProposals })
}

export const getMyAsks = async (req, res) => {
    const { user } = req

    const askedToMe = await findAskedProposalsForUser(user.id)

    return res.status(200).json({ message: askedToMe })
}

export const acceptExchange = async (req, res) => {
    const { user } = req
    const { exchangeId } = req.params

    const exchangeProposal = await getExchageProposaForAskedUser(parseInt(user.id), parseInt(exchangeId))

    if (!exchangeProposal) {
        return res.status(404).json({ message: "Exchange not found for User" })
    }

    const acceptedProposal = await acceptProposal(parseInt(exchangeId));

    return res.status(200).json({ message: acceptedProposal })
}

export const rejectExchange = async (req, res) => {
    const { user } = req;
    const { exchangeId } = req.params;

    try {
        const exchangeProposal = await getExchageProposaForAskedUser(parseInt(user.id), parseInt(exchangeId));

        if (!exchangeProposal) {
            return res.status(404).json({ message: "Exchange not found for User" });
        }

        const rejectedProposal = await rejectProposal(parseInt(exchangeId))

        return res.status(200).json({ message: "Exchange rejected successfully", proposal: rejectedProposal });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

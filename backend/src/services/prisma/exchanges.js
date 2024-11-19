import { ExchangeProposalStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createExchange = async (data) => {
    return prisma.exchangeProposal.create(data)
}

export const findProposalsForUser = async (poproposerId) => {
    return await prisma.exchangeProposal.findMany({
        where: {
            proposerUserId: poproposerId
        }
    })
}

export const findAskedProposalsForUser = async (askedUserId) => {
    return await prisma.exchangeProposal.findMany({
        where: {
            askedUserId: askedUserId
        }
    })
}

export const getExchageProposaForAskedUser = async (userId, exchangeId) => {
    return await prisma.exchangeProposal.findFirst({
        where: {
            askedUserId: userId,
            id: exchangeId
        }
    })
}

export const acceptProposal = async (exchangeProposalId) => {
    return await prisma.exchangeProposal.update({
        where: {
            id: exchangeProposalId
        },
        data: {
            status: ExchangeProposalStatus.ACCEPTED
        }
    })
}

export const rejectProposal = async (exchangeProposalId) => {
    return await prisma.exchangeProposal.update({
        where: {
            id: exchangeProposalId
        },
        data: {
            status: ExchangeProposalStatus.REJECTED
        }
    })
}
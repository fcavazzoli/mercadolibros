import { Backend } from "./backend"

const backend = new Backend()

export const proposeExchange = async (myBookId, requestedBookId, requestedUserId) => {
    console.log('Requesting ...', { myBookId, requestedBookId, requestedUserId });

    const body = {
        proposerBookId: myBookId,
        requestedBookId: requestedBookId,
        requestedUserId: requestedUserId
    };

    const requestedResponse = await backend.post('/exchanges', body);
    console.log("Create Exchange Request: ", requestedResponse);
}

export const getMyProposals = async () => {
    console.log('Getting My Exchanges Proposals...');

    const myProposals = await backend.get('/exchanges/myProposals');
    console.log("My Proposals: ", myProposals);
    return myProposals.message;
}

export const getMyAsks = async () => {
    console.log('Getting My Exchanges Asks...');

    const myAsks = await backend.get('/exchanges/askedToMe');
    console.log("My Asks: ", myAsks);
    return myAsks.message;
}

export const acceptProposal = async (exchangeProposalId) => {
    console.log("Accepting Exchange Proposal... ", exchangeProposalId);

    const acceptedResponse = await backend.patch(`/exchanges/${exchangeProposalId}/accept`);
    console.log("Accepted Exchage proposal: ", acceptedResponse);
    return acceptedResponse;
}

export const rejectProposal = async (exchangeProposalId) => {
    console.log("Rejecting Exchange Proposal... ", exchangeProposalId);

    const rejectedResponse = await backend.patch(`/exchanges/${exchangeProposalId}/decline`);
    console.log("Rejected Exchange proposal: ", rejectedResponse);
    return rejectedResponse;
}
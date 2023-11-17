import * as fcl from '@onflow/fcl';
import setupColectionTx from '../cadence/transactions/setup_collection.cdc?raw';

async function setupCollection() {
	const transactionId = await fcl.mutate({
		cadence: setupColectionTx,
		args: (arg, t) => [],
		proposer: fcl.authz,
		payer: fcl.authz,
		authorizations: [fcl.authz],
		limit: 999
	});

	console.log('Transaction Id', transactionId);

	return transactionId;
}

export default setupCollection;

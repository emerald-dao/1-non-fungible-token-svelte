import * as fcl from '@onflow/fcl';
import transferTx from '../cadence/transactions/transfer.cdc?raw';
import replaceWithProperImports from '$flow/utils/replaceWithProperImports';

async function transfer(recipient, withdrawID) {
	const transactionId = await fcl.mutate({
		cadence: replaceWithProperImports(transferTx),
		args: (arg, t) => [arg(recipient, t.Address), arg(withdrawID, t.UInt64)],
		proposer: fcl.authz,
		payer: fcl.authz,
		authorizations: [fcl.authz],
		limit: 999
	});

	console.log('Transaction Id', transactionId);

	return transactionId;
}

export default transfer;

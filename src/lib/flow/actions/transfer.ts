import * as fcl from '@onflow/fcl';
import transferTx from '../cadence/transactions/transfer.cdc?raw';

async function transfer(recipient: string, withdrawID: string) {
	const transactionId = await fcl.mutate({
		cadence: transferTx,
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

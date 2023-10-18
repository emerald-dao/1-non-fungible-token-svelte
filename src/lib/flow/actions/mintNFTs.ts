import * as fcl from '@onflow/fcl';
import mintNFTsTx from '../cadence/transactions/mint_nfts.cdc?raw';
import replaceWithProperImports from '../utils/replaceWithProperImports';

async function mintNFTs(
	recipient: string,
	names: string[],
	descriptions: string[],
	thumbnails: string[],
	serverAuthorization
) {
	const transactionId = await fcl.mutate({
		cadence: replaceWithProperImports(mintNFTsTx),
		args: (arg, t) => [
			arg(names, t.Array(t.String)),
			arg(descriptions, t.Array(t.String)),
			arg(thumbnails, t.Array(t.String)),
			arg(recipient, t.Address)
		],
		proposer: serverAuthorization,
		payer: serverAuthorization,
		authorizations: [serverAuthorization],
		limit: 999
	});

	console.log('Transaction Id', transactionId);

	return transactionId;
}

export default mintNFTs;
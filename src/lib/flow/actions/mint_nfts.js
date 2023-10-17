require('../config');
import * as fcl from '@onflow/fcl';
import mintNftsTx from '../cadence/transactions/mint_nfts.cdc?raw';
import replaceWithProperImports from '../utils/replaceWithProperImports';

async function mintNFTs(recipient) {
	const names = ['Education', 'Building', 'Governance'];
	const descriptions = [
		'This is the logo of the Education Guild',
		'This is the logo of the Building Guild',
		'This is the logo of the Governance Guild'
	];
	const thumbnails = [
		'QmYVKNWdm2961QtHz721tdA8dvBT116eT2DtATsX53Kt28',
		'QmPkJbnJSt3ZkHuGAnHyHCAhWVrneRrK6VHMjgu5oPGnoq',
		'QmcpmzEDmZtP37csyNaYaxzhoMQmmUrQsihE3x2XGKsg1Z'
	];

	try {
		const transactionId = await fcl.mutate({
			cadence: replaceWithProperImports(mintNftsTx),
			args: (arg, t) => [
				arg(names, t.Array(t.String)),
				arg(descriptions, t.Array(t.String)),
				arg(thumbnails, t.Array(t.String)),
				arg(recipient, t.Address)
			],
			proposer: fcl.authz,
			payer: fcl.authz,
			authorizations: [fcl.authz],
			limit: 999
		});

		console.log('Transaction Id', transactionId);

		return transactionId;
	} catch (e) {
		console.log(e);
	}
}

mintNFTs(process.argv.slice(2)[0]);

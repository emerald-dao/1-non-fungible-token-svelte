import * as fcl from '@onflow/fcl';
import getNftsScript from '../cadence/scripts/get_nfts.cdc?raw';

async function getNFTs(userAddress: string) {
	const result = await fcl.query({
		cadence: getNftsScript,
		args: (arg, t) => [arg(userAddress, t.Address)]
	});

	return result;
}

export default getNFTs;

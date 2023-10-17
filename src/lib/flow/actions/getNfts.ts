import * as fcl from '@onflow/fcl';
import getNftsScript from '../cadence/scripts/get_nfts.cdc?raw';
import replaceWithProperImports from '$flow/utils/replaceWithProperImports';

async function getNFTs(userAddress: string) {
	const result = await fcl.query({
		cadence: replaceWithProperImports(getNftsScript),
		args: (arg, t) => [arg(userAddress, t.Address)]
	});

	return result;
}

export default getNFTs;

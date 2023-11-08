<script type="ts">
	import GetNftsCodeModal from '$lib/components/codeblocks/GetNftsCodeModal.svelte';
	import SetupCollectionCodeModal from '$lib/components/codeblocks/SetupCollectionCodeModal.svelte';
	import getNFTs from '$flow/actions/getNfts';
	import setupCollection from '$flow/actions/setupCollection';
	import executeTransaction from '$flow/utils/executeTransaction';
	import * as Card from '$lib/components/Card';
	import Collection from '$lib/components/Collection.svelte';
	import type { NFT } from '$lib/types/nft.interface';
	import { user } from '$stores/UserStore';
	import { Button } from '@emerald-dao/component-library';

	let nfts: NFT[] = [];

	$: {
		if (!$user?.loggedIn) {
			nfts = [];
		}
	}

	const handleSetupCollection = async () => {
		if ($user) {
			await executeTransaction(() => setupCollection());
		} else {
			alert('Please connect your wallet first');
		}
	};

	const handleGetNfts = async () => {
		if ($user) {
			const userNfts = await getNFTs($user.addr);
			nfts = userNfts;
		} else {
			alert('Please connect your wallet first');
		}
	};
</script>

<Card.Root maxWidth="80ch">
	<Card.Section>
		<span class="w-medium small">Non Fungible Token DApp</span>
	</Card.Section>
	<Card.Section>
		<span class="w-medium small">1. Setup Your Collection</span>
		<span class="small">In order to receive your NFTs you must first setup a collection.</span>
		<div class="row-2">
			<Button size="small" on:click={handleSetupCollection}>Setup Collection</Button>
			<SetupCollectionCodeModal />
		</div>
	</Card.Section>
	<Card.Section>
		<span class="w-medium small">2. Mint NFTs to Your Account</span>
		<span class="small">
			Time to go back to your terminal! Look for the scripts directory and execute the
			<code>mint</code>
			function.
		</span>
	</Card.Section>
	<Card.Section>
		<span class="w-medium small">3. Get NFTs</span>
		<span class="small">
			Now, we are going to run a script to get all the NFTs stored in your collection.
		</span>
		<div class="row-2">
			<Button size="small" on:click={handleGetNfts}>Get NFTs</Button>
			<GetNftsCodeModal />
		</div>
	</Card.Section>
	<Card.Section>
		<span class="w-medium small">4. Your NFTs</span>
		<span class="small">
			Bellow, you can find the NFTs stored in your collection. Feel free to transfer them other
			wallets!
		</span>
		<Collection {nfts} />
	</Card.Section>
</Card.Root>

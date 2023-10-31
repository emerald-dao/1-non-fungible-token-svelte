<script type="ts">
	import getNFTs from '$flow/actions/getNfts';
	import setupCollection from '$flow/actions/setupCollection';
	import executeTransaction from '$flow/utils/executeTransaction';
	import * as Card from '$lib/components/Card';
	import Vault from '$lib/components/Vault.svelte';
	import type { NFT } from '$lib/types/nft.interface';
	import { user } from '$stores/UserStore';
	import { Button } from '@emerald-dao/component-library';

	let nfts: NFT[] = [];

	$: {
		if (!$user?.loggedIn) {
			nfts = [];
		}
	}
	const handleGetNfts = async () => {
		if ($user) {
			const nftss = await getNFTs($user.addr);
			console.log('nfts', nftss);
			nfts = nftss;
		}
	};
</script>

<Card.Root maxWidth="40ch">
	<Card.Section>
		<span class="w-medium small">Non Fungible Token DApp</span>
	</Card.Section>
	<Card.Section>
		<span class="w-medium small">1. Set up your vault</span>
		<span class="small"
			>In order to receive your NFTs you should first setup a vault for the collection.</span
		>
		<div class="row-2">
			<Button size="small" on:click={() => executeTransaction(() => setupCollection())}
				>Setup Vault</Button
			>
			<!-- <ChangeGreetingCodeModal /> -->
		</div>
	</Card.Section>
	<Card.Section>
		<span class="w-medium small">2. Transfer NFTs to your account.</span>
		<span class="small"
			>Time to go back to your terminal! Look for the scripts directory and execute the <code
				>mint</code
			>
			function.</span
		>
	</Card.Section>
	<Card.Section>
		<span class="w-medium small">3. Get NFTs</span>
		<span class="small"
			>Now, we are going to run a script to get all the NFTs stored in your vault.</span
		>
		<div class="row-2">
			<Button size="small" on:click={handleGetNfts}>Get NFTs</Button>
			<!-- <ChangeGreetingCodeModal /> -->
		</div>
	</Card.Section>
	<Card.Section>
		<span class="w-medium small">4. Your NFTs</span>
		<span class="small"
			>Bellow, you can find the NFTs stored in your vault. Feel free to transfer them other wallets!</span
		>
		<Vault {nfts} />
	</Card.Section>
</Card.Root>

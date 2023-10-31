<script lang="ts">
	import type { NFT } from '$lib/types/nft.interface';
	import { user } from '$stores/UserStore';
	import NftCard from './NFTCard.svelte';

	export let nfts: NFT[];
</script>

<div class="main-wrapper column-4">
	{#if $user?.addr}
		<span class="title small w-medium">Vault</span>
		{#if nfts.length > 0}
			{#each nfts as nft}
				<NftCard {nft} />
			{/each}
		{:else}
			<span class="small"><em>Your vault is empty</em></span>
		{/if}
	{:else}
		<span class="small"><em>Connect wallet to see the vault</em></span>
	{/if}
</div>

<style lang="scss">
	.main-wrapper {
		background-color: var(--clr-primary-badge);
		border: 1px solid var(--clr-primary-main);
		border-radius: var(--radius-2);
		padding: var(--space-5);

		.title {
			color: var(--clr-primary-main);
		}

		em {
			color: var(--clr-text-off);
		}
	}
</style>

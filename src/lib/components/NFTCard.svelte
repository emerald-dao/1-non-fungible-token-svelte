<script lang="ts">
	import transfer from '$flow/actions/transfer';
	import executeTransaction from '$flow/utils/executeTransaction';
	import type { NFT } from '$lib/types/nft.interface';
	import { Button } from '@emerald-dao/component-library';
	import * as Card from '$lib/components/Card';

	export let nft: NFT;
</script>

<Card.Root>
	<Card.Section>
		<div class="column-7 align-center">
			<div class="column-1">
				<h3 class="w-medium">{nft.name} NFT</h3>
				<p class="small">{nft.description}</p>
			</div>
			<img
				src={`https://cloudflare-ipfs.com/ipfs/${nft.thumbnail.url}`}
				width="100"
				alt="NFT logo"
				style="justify-content: center;"
			/>
		</div>
	</Card.Section>
	<Card.Section>
		<span class="w-medium small">Transfer NFT</span>
		<div class="row-2">
			<input
				class="input-field"
				type="text"
				placeholder="Insert wallet address"
				bind:value={nft.recipientId}
			/>
			<Button
				size="small"
				on:click={() => executeTransaction(() => transfer(nft.recipientId, nft.id))}
				>Transfer</Button
			>
		</div>
	</Card.Section>
</Card.Root>

<style lang="scss">
	p,
	h3 {
		text-align: center;
	}

	h3 {
		font-size: var(--font-size-4);
	}
</style>

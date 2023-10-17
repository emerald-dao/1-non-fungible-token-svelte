<script type="ts">
	import getNFTs from '$flow/actions/getNfts';
	import setupCollection from '$flow/actions/setupCollection';
	import executeTransaction from '$flow/utils/executeTransaction';
	import dappData from '$lib/config/dappData';
	import { user } from '$stores/UserStore';

	let nfts;

	const handleGetGreeting = async () => {
		if ($user) {
			nfts = await getNFTs($user.addr);
		}
	};
</script>

<section class="container">
	<span>Welcome to</span>
	<h1>{dappData.title}</h1>
	<p>{dappData.description}</p>
	<p>Crafted by {dappData.author}</p>
	<section>
		<div class="row-4">
			<button on:click={() => executeTransaction(() => setupCollection())}>Setup collection</button>
			<button on:click={handleGetGreeting}>Get NFTs</button>
		</div>

		{#if nfts}
			{#each nfts as nft}
				{nft.name}
			{/each}
		{/if}
	</section>
</section>

<style type="scss">
	section {
		min-height: 50vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);

		h1,
		p {
			text-align: center;
		}

		h1 {
			color: var(--clr-primary-main);
		}
	}
</style>

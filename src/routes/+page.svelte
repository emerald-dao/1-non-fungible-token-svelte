<script type="ts">
	import getNFTs from '$flow/actions/getNfts';
	import setupCollection from '$flow/actions/setupCollection';
	import transfer from '$flow/actions/transfer';
	import executeTransaction from '$flow/utils/executeTransaction';
	import dappData from '$lib/config/dappData';
	import { user } from '$stores/UserStore';


	interface NFT {
		thumbnail: {
			url: string;
		};
		name: string;
		description: string;
		id: string;
		recipientId:string;
	}
	let nfts: NFT[] = [];

	$: {
		if (!$user?.loggedIn) {
			nfts = [];
		}
 	 }
	const handleGetNfts = async () => {
		if ($user) {
			const nftss = await getNFTs($user.addr);
			console.log("nfts", nftss);
			nfts =nftss;
		}
	};
</script>

<section class="container">
	<span>Welcome to</span>
	<h1>{dappData.title}</h1>
	<p>{dappData.description}</p>
	<p>Crafted by {dappData.author}</p>
	{#if $user?.addr}
		<section>
			<div class="display:flex; justify-content: center;">
				<button class="button-style" style="width: 9rem; margin-right: 6px;;" on:click={() => executeTransaction(() => setupCollection())}>Setup collection</button>
				<button class="button-style" style="width: 9rem; margin-left: 6px;" on:click={handleGetNfts}>Get NFTs</button>
			</div>
			<div class="nfts-section">
				{#if nfts}
				{#each nfts as nft}
					<div class="nft-card">
						<div class="nft-info">
							<h1>{nft.name}</h1>
							<p>33</p><!--Falta ver como poner el id, porque nft.id es un numero largaso-->
						</div>
						<p style="color: #A0AEC0; font-size: 16px;">{nft.description}</p>
						<div style="display: flex; justify-content: center; padding-top: 8px;">
							<img
								src={`https://cloudflare-ipfs.com/ipfs/${nft.thumbnail.url}`}
								width={150}
								alt="NFT logo"
								style="justify-content: center;"
							/>
						</div>
						<div style="display: flex; flex-direction: column; padding-top: 8px; gap: 4px;">
							<input class="input-field" type="text" bind:value={nft.recipientId} />
							<button  class="button-style" on:click={() => executeTransaction(() => transfer(nft.recipientId, nft.id))}
								>Transfer</button>
						</div>
					</div>
				{/each}
				{/if}
			</div>
		</section>
	{/if}
</section>

<style type="scss">
	.button-style {
		border: 1px solid #38E8C6;
		border-radius: 8px;
		padding: 8px 16px;
		font-size: 0.9rem;
		font-weight: 600;
		color: #131212;
		background-color: #38E8C6;
	}
	.input-field {
		padding: 4px;
		margin-bottom: 1px;
		padding: 8px 16px;
		outline: none;
		border: 2px solid #38E8C6;
		background-color: #F0FFF4;
		border-radius: 8px;
		font-weight: bold;
	}

	.input-field:focus {
		border: 2px solid #38E8C6;
		outline: none;
		color:#0055b3;
	}

	.nfts-section {
		display: flex;
		// grid-template-columns: repeat(3, 1fr); 
		gap: 60px; 
		padding: 5px;
		justify-content: center;
		text-align: center;
	}
	.nft-card {
		border: 1px solid #38E8C6;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		background-color: #38E8C6;
		border-radius: 8px;
		backdrop-filter: blur(4px);
		padding: 16px;
		background-clip: padding-box;
		background-color: rgba(56, 232, 198, 0.4);
		width: 22rem;
	}
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
	.nft-info {
		display: flex;
		justify-content: space-between;
		padding-bottom: 4px;

		h1 {
			font-weight: bold;
			color: #38E8C6;
			font-size: 1.2rem; // Tamaño de fuente ajustable según tus necesidades
		}

		p {
			font-weight: 600;
			color: #38E8C6;
		}
	}

</style>

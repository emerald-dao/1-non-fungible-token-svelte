<script lang="ts">
	import getNFTs from '$flow/actions/getNfts?raw';
	import CodeBlockModal from './CodeBlockModal.svelte';
	import getNftsScript from '$lib/flow/cadence/scripts/get_nfts.cdc?raw';

	const codeBlocks = [
		{
			codeTitle: 'getNFTs.ts',
			code: `${getNFTs}`,
			lang: 'javascript'
		},
		{
			codeTitle: 'get_nfts.cdc',
			code: `${getNftsScript}`,
			lang: 'cadence'
		}
	];
</script>

<CodeBlockModal id="get-greeting-transaction" {codeBlocks} codeBlockType="script">
	<div class="column-2">
		<h3 class="large"><strong>getNfts</strong> script</h3>
		<p class="small">This is the FCL code that fetches the NFTs from the connected user vault.</p>
	</div>
</CodeBlockModal>

<style lang="scss">
	div {
		padding-bottom: var(--space-6);
		position: sticky;
		top: 0;
		background-color: var(--clr-surface-secondary);
		z-index: 1;

		h3 {
			font-size: var(--font-size-3);
		}
	}
</style>

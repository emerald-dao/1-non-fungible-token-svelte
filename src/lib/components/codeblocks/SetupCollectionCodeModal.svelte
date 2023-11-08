<script lang="ts">
	import setupCollection from '$lib/flow/actions/setupCollection?raw';
	import CodeBlockModal from './CodeBlockModal.svelte';
	import setupCollectionTx from '$lib/flow/cadence/transactions/setup_collection.cdc?raw';

	const codeBlocks = [
		{
			codeTitle: 'setupCollection.ts',
			code: `${setupCollection}`,
			lang: 'javascript'
		},
		{
			codeTitle: 'setup_collection.cdc',
			code: `${setupCollectionTx}`,
			lang: 'cadence'
		}
	];
</script>

<CodeBlockModal id="setup-collection-transaction" {codeBlocks} codeBlockType="transaction">
	<div class="column-2">
		<h3><strong>setupCollection</strong> transaction</h3>
		<p class="small">
			This is the FCL code that runs a transaction to setup a collection for the connected user.
		</p>
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

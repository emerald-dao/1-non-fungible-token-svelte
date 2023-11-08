<script lang="ts">
	import transfer from '$lib/flow/actions/transfer?raw';
	import CodeBlockModal from './CodeBlockModal.svelte';
	import transferTx from '$lib/flow/cadence/transactions/transfer.cdc?raw';

	const codeBlocks = [
		{
			codeTitle: 'transfer.ts',
			code: `${transfer}`,
			lang: 'javascript'
		},
		{
			codeTitle: 'transfer.cdc',
			code: `${transferTx}`,
			lang: 'cadence'
		}
	];
</script>

<CodeBlockModal id="transfer-transaction" {codeBlocks} codeBlockType="transaction">
	<div class="column-2">
		<h3><strong>transfer</strong> transaction</h3>
		<p class="small">
			This is the FCL code that runs a transaction to transfer NFTs from one user to another.
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

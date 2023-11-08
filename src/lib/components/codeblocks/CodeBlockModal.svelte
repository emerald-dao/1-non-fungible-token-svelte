<script lang="ts">
	import { Button, CodeBlock, Modal, getModal } from '@emerald-dao/component-library';
	import Icon from '@iconify/svelte';

	interface CodeBlockDetails {
		codeTitle: string;
		code: string;
		lang: string;
	}

	export let codeBlocks: CodeBlockDetails[];
	export let id: string;
	export let codeBlockType: 'transaction' | 'script';
</script>

<Button on:click={() => getModal(id).open()} type="transparent" size="x-small">
	<Icon icon="tabler:code" />
	{`View ${codeBlockType}`}</Button
>
<Modal {id} overflowVisible={false}>
	<div class="modal-content">
		<slot />
		<div class="code-blocks-wrapper">
			{#each codeBlocks as { code, lang, codeTitle }}
				<div>
					<span class="small"><code>/{codeTitle}</code></span>
					<CodeBlock {code} {lang} />
				</div>
			{/each}
		</div>
	</div>
</Modal>

<style lang="scss">
	.modal-content {
		max-width: 60vw;
		max-height: 70vh;
		display: flex;
		flex-direction: column;
		padding: var(--space-3) var(--space-7);

		.code-blocks-wrapper {
			padding: var(--space-4) var(--space-8);
			overflow-x: hidden;
			border: 1px solid var(--clr-border-primary);
			border-radius: var(--radius-2) 0 0 var(--radius-2);
			background-color: var(--clr-background-primary);
		}
	}
</style>

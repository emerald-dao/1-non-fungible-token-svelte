<script>
	export let maxWidth = '100%';
</script>

<div class="shadow-large" style={`max-width: ${maxWidth}`}>
	<slot />
</div>

<style lang="scss">
	div {
		background-color: var(--clr-surface-secondary);
		padding: 0;
		z-index: 1;
		border-radius: var(--radius-4);
		border: 1px solid var(--clr-border-primary);
	}
</style>

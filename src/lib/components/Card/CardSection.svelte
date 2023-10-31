<div>
	<slot />
</div>

<style lang="scss">
	div {
		padding: var(--space-5) var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);

		&:not(:last-child) {
			border-bottom: 1px solid var(--clr-border-primary);
		}
	}
</style>

<script lang="ts">
	import dappData from '$lib/config/dappData';
</script>

<div class="main-wrapper column-4 align-center">
	<div class="label shadow-medium">Quickstart 1</div>
	<h1 class="w-medium">{dappData.title}</h1>
	<div>
		<p>{dappData.description}</p>
	</div>
</div>

<style lang="scss">
	.main-wrapper {
		z-index: 1;

		h1 {
			text-align: center;
			font-size: var(--font-size-7);
		}

		.label {
			font-family: var(--font-mono);
			font-size: var(--font-size-1);
			background-color: var(--clr-primary-badge);
			color: var(--clr-primary-main);
			padding: var(--space-1) var(--space-3);
			border-radius: var(--radius-1);
			border: 1px solid var(--clr-primary-main);
		}

		p {
			text-align: center;
		}
	}
</style>

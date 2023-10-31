<script type="ts">
	import '@emerald-dao/design-system/build/variables-dark.css';
	import '@emerald-dao/design-system/build/variables-light.css';
	import '@emerald-dao/design-system/build/variables.css';
	import '@emerald-dao/component-library/styles/app.scss';
	import '../app.postcss';
	import getFindProfile from '../lib/flow/utils/getFindProfile';
	import { emeraldTools, socialMedia } from '$lib/config/navigation';
	import type { User } from '@emerald-dao/component-library/models/user.interface';
	import { transaction } from '$stores/TransactionStore';
	import { profile, user } from '$stores/UserStore';
	import { logIn, unauthenticate } from '../lib/flow/actions/authentication';
	import { Header, Footer, TransactionModal } from '@emerald-dao/component-library';
	import { network } from '$lib/flow/config';
	import QuickstartIntroduction from '$lib/components/QuickstartIntroduction.svelte';
	import Blur from '$lib/components/Blur.svelte';

	// When a user is connected we set the profile store to save the profile data
	$: if ($user && $user.addr) {
		getFindProfile($user.addr).then((res) => {
			if (res) {
				profile.set({
					...res,
					address: ($user as User).addr as string,
					type: 'find'
				});
			} else {
				profile.set({
					address: ($user as User).addr as string,
					avatar: '/avatars/anon-avatar.png',
					name: 'Anonymus User',
					type: 'find'
				});
			}
		});
	} else {
		profile.set(null);
	}
</script>

<TransactionModal
	transactionInProgress={$transaction.progress}
	transactionStatus={$transaction.transaction}
	on:close={() => transaction.resetTransaction()}
/>
<Header
	user={$user}
	profile={$profile}
	{network}
	transactionInProgress={$transaction.progress}
	{logIn}
	{unauthenticate}
	logoUrl="/ea-logo.png"
	logoText="Hello World Quickstart"
/>
<main>
	<section class="container-small">
		<QuickstartIntroduction />
		<slot />
		<Blur right="10%" top="45%" color="tertiary" />
		<Blur left="10%" bottom="45%" />
	</section>
</main>
<Footer {emeraldTools} socials={socialMedia} logoUrl="ea-logo.png" logoText="Emerald Academy" />

<style lang="scss">
	main {
		background-color: var(--clr-background-secondary);

		section {
			min-height: 50vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: var(--space-10);
		}
	}
</style>

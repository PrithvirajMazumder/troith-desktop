<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/Alert/alert.svelte';
	import type { User } from '@supabase/supabase-js';
	import { setContext } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	setContext<User | null>('registered-user', null);

	$: {
		if (browser && data.session) {
			goto('/app');
		}
	}
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<slot />
	</div>
</div>

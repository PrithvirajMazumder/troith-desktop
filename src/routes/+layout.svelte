<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Alert from '$lib/components/Alert/alert.svelte';
	import Toast from '$lib/components/Toasts/toasts.svelte';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		console.log('app is triggering');

		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Alert />
<Toast />
<slot />

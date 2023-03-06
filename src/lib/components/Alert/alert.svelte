<script lang="ts">
	import type { AlertProps } from '$lib/stores/alertStore';
	import AlertStore from '$lib/stores/alertStore';
	import { onDestroy } from 'svelte';

	let alert: AlertProps | null;
	const unsubscribe = AlertStore.subscribe((data) => (alert = data));

	onDestroy(unsubscribe);
</script>

{#if alert}
	<div class={`alert shadow-lg alert-${alert.type}`}>
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-info flex-shrink-0 w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<div>
				{#if alert.title && !!alert?.title.length}
					<h3 class="font-bold">{alert.title}</h3>
				{/if}
				<div class="text-xs">{alert.message}</div>
			</div>
		</div>
		<div class="flex-none">
			<button
				class="btn btn-sm btn-ghost"
				on:click|preventDefault={() => {
					AlertStore.set(null);
				}}
			>
				close
			</button>
		</div>
	</div>
{/if}

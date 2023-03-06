<script lang="ts">
	import Toast from '$lib/components/Toasts/toast.svelte';
	import { onDestroy } from 'svelte';
	import ToastStore, { type ToastProps } from '../../stores/toastStore';

	let toasts: ToastProps[];

	const unsubscribe = ToastStore.subscribe((data) => {
		toasts = data;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="toast toast-bottom toast-end">
	{#each toasts as toast, index}
		<Toast
			{toast}
			on:clear={() => {
				ToastStore.update((toasts) => {
					const [firstToast, ...rest] = toasts;
					return rest;
				});
			}}
		/>
	{/each}
</div>

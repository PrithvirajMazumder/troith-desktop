<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type Party from '$lib/interfaces/Party';

	export let party: Party;

	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click|preventDefault={() => {
		dispatch('select');
	}}
	class="flex hover:border-primary border-primary-content border w-full p-2 rounded-xl my-4 transition-all duration-300 hover:cursor-pointer items-center"
>
	<div class="avatar placeholder ml-4">
		<div class="bg-neutral-focus text-neutral-content rounded-full w-12">
			<span class="text-3xl">{party.name[0]}</span>
		</div>
	</div>
	<div class="divider divider-horizontal" />
	<div>
		<h2 class="text-xl">{party.name}</h2>
		<p class="text-xs">{party.address}</p>
	</div>
	<p class="text-sm font-bold ml-auto mr-4">GSTIN: {party.gstin}</p>
</div>

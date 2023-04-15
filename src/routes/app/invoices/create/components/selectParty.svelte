<script lang="ts">
	import type Party from '$lib/interfaces/Party';
	import { createEventDispatcher } from 'svelte';
	import PartyCard from './partyCard.svelte';

	const parties: Party[] = [
		{
			name: 'GS WASH',
			address: '153/38 SN Roy Road, Kolkata: 700038',
			id: '1',
			gstin: 'dsadsad',
			createdAt: new Date()
		},
		{
			name: 'KD Liquor',
			address: '153/38 SN Roy Road, Kolkata: 700038',
			id: '2',
			gstin: 'dsadsad',
			createdAt: new Date()
		},
		{
			name: 'Heral Pvt. Ltd.',
			address: '153/38 SN Roy Road, Kolkata: 700038',
			id: '1',
			gstin: 'dsadsad',
			createdAt: new Date()
		}
	];

	const dispatch = createEventDispatcher();
</script>

<h2 class=" text-3xl font-bold mb-4">Select a party</h2>
<p class="text mb-2 lg:mb-0 opacity-60">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, rerum magni facere optio
	ratione sapiente nulla reprehenderit? Ea tempora ab ut odit illo officiis sit pariatur distinctio
	repudiandae. Tempora, unde!
</p>
<div class="mt-8">
	{#each parties as party}
		<PartyCard
			on:select={() => {
				dispatch('partySelect', { party });
			}}
			{party}
		/>
	{/each}
</div>

<script lang="ts">
	import type Item from '$lib/interfaces/Item';
	import type Party from '$lib/interfaces/Party';
	import Icon from '@iconify/svelte';
	import SelectItems from './components/selectItems.svelte';
	import SelectParty from './components/selectParty.svelte';
	import StepOverviewCard from './components/stepOverviewCard.svelte';

	let selectedParty: Party;
	let selectedItems: Item[] = [];
</script>

<div class="flex items-center my-4">
	<StepOverviewCard completed={!!selectedParty} />
	<StepOverviewCard completed={!!selectedItems.length} />
	<StepOverviewCard />
	<StepOverviewCard />
</div>
<div class="flex">
	<h2 class="text-4xl font-bold mb-2 lg:mb-0">Create invoice</h2>
	<button class="btn ml-auto">
		<Icon class="text-xl" icon="mdi:close" />

		Cancel
	</button>
</div>
<div class="flex mt-8 flex-col lg:flex-row">
	<div class="w-full hidden lg:block lg:w-min mb-4 lg:mb-0">
		<ul class="steps steps-horizontal w-full lg:w-max lg:steps-vertical">
			<li class="step" class:step-primary={!!selectedParty}>Party</li>
			<li class="step" class:step-primary={!!!!selectedItems.length}>Items</li>
			<li class="step">Taxation</li>
			<li class="step">Confirmation</li>
		</ul>
	</div>
	<div class="divider divider-horizontal" />
	<div class="flex-1 ph-4">
		{#if !selectedParty}
			<SelectParty on:partySelect={({ detail: { party } }) => (selectedParty = party)} />
		{/if}
		{#if selectedParty && !selectedItems.length}
			<SelectItems
				on:itemsSelect={({ detail: { items } }) => {
					selectedItems = items;
				}}
			/>
		{/if}
	</div>
</div>

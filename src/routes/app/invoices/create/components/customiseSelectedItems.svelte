<script lang="ts">
	import type Item from '$lib/interfaces/Item';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let selectedItems: Item[] = [];
	let orginalSelectedItems: Item[] = selectedItems.map((selectedItem) => {
		return { ...selectedItem };
	});
	const dispatch = createEventDispatcher();
</script>

<div class="flex items-center mb-4">
	<h2 class=" text-3xl font-bold mb-4">Customise selected items</h2>
	<button
		class="btn ml-auto"
		on:click|preventDefault={() => {
			selectedItems = orginalSelectedItems.map((orginalSelectedItem) => {
				return { ...orginalSelectedItem };
			});
		}}
	>
		<Icon class="text-xl mr-2" icon="mdi:refresh" />
		Reset
	</button>
	<button
		class="btn btn-primary ml-4"
		on:click|preventDefault={() => {
			dispatch('itemSubmitted', { items: selectedItems });
		}}
	>
		<Icon class="text-xl" icon="mdi:done" />
		Continue
	</button>
</div>
<p class="text mb-2 lg:mb-0 opacity-60">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, rerum magni facere optio
	ratione sapiente nulla reprehenderit? Ea tempora ab ut odit illo officiis sit pariatur distinctio
	repudiandae. Tempora, unde!
</p>
<div class="mt-8">
	{#each selectedItems as selectedItem}
		<div
			class="flex indicator border-primary-content border w-full p-2 rounded-xl my-4 items-center"
		>
			<button
				on:click|preventDefault={() => {
					selectedItems = selectedItems.filter((item) => item.id !== selectedItem.id);
				}}
				class="indicator-item indicator-end p-0 badge badge-error"
			>
				<Icon class="text-xl" icon="mdi:close" />
			</button>
			<div class="avatar placeholder ml-4">
				<div class="bg-neutral-focus text-neutral-content rounded-xl w-12">
					<span class="text-3xl">{selectedItem.name[0].toUpperCase()}</span>
				</div>
			</div>
			<div class="divider divider-horizontal" />
			<div>
				<h2 class="text-xl">{selectedItem.name}</h2>
				<div class="flex items-center gap-2 my-2">
					<div class="form-control">
						<label class="input-group input-group-sm">
							<span class="bg-base-100"> ₹ </span>
							<input
								type="text"
								placeholder="Price"
								bind:value={selectedItem.price}
								class="input input-bordered input-sm focus:outline-primary"
							/>
						</label>
					</div>
					x
					<div class="form-control">
						<label class="input-group input-group-sm">
							<input
								type="text"
								placeholder="Quantity"
								bind:value={selectedItem.quantity}
								class="input input-bordered input-sm focus:outline-primary"
							/>
							<span class="bg-base-100">{selectedItem.unit?.shortName.toLocaleLowerCase()}</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<script lang="ts">
	import Loader from '$lib/components/loader.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import usePagination from '$lib/hooks/usePagination';
	import type Item from '$lib/interfaces/Item';
	import ItemService from '$lib/services/item';
	import Icon from '@iconify/svelte';
	import { onMount, createEventDispatcher } from 'svelte';

	const itemService = new ItemService();
	const [items, isItemsLoading, , itemsCurrentPage, itemsLastPage, loadItems] = usePagination<Item>(
		itemService.getItems
	);
	let selectedItems: Item[] = [];
	const dispatch = createEventDispatcher();

	const handleClickItem = (item: Item) => {
		const filteredSelectedItems = selectedItems.filter(
			(selectedItem) => selectedItem.id !== item.id
		);

		if (filteredSelectedItems.length !== selectedItems.length) {
			selectedItems = filteredSelectedItems;
			return;
		}

		selectedItems = [...selectedItems, item];
	};

	onMount(() => {
		loadItems();
	});
</script>

<div class="flex mb-4 items-center">
	<h2 class=" text-3xl font-bold">Select items</h2>

	<button
		class="btn btn-primary ml-auto"
		class:btn-disabled={!selectedItems.length}
		on:click|preventDefault={() => {
			dispatch('itemsSelect', { items: selectedItems });
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
<div>
	<Loader isLoading={$isItemsLoading} />

	{#each $items as item}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="flex indicator hover:border-primary border-primary border-primary-content border w-full p-2 rounded-xl my-4 transition-all duration-300 hover:cursor-pointer items-center"
			on:click={() => handleClickItem(item)}
		>
			{#if !!selectedItems.find((selectedItem) => selectedItem.id === item.id)}
				<span class="indicator-item indicator-start p-0 badge badge-primary">
					<Icon class="text-xl" icon="mdi:done" />
				</span>
			{/if}
			<div class="avatar placeholder ml-4">
				<div class="bg-neutral-focus text-neutral-content rounded-xl w-12">
					<span class="text-3xl">{item.name[0].toUpperCase()}</span>
				</div>
			</div>
			<div class="divider divider-horizontal" />
			<div>
				<h2 class="text-xl">{item.name}</h2>
				<p class="text-xs text-primary">₹{item.price}</p>
			</div>
			<p class="text-sm font-bold ml-auto mr-4">Unit: {item.unit?.shortName}</p>
		</div>
	{/each}
	{#if $items.length}
		<div class="ml-auto flex justify-center">
			<Pagination
				on:onPageChange={({ detail }) => {
					loadItems(detail);
				}}
				currentPage={$itemsCurrentPage}
				lastPage={itemsLastPage}
			/>
		</div>
	{/if}
</div>

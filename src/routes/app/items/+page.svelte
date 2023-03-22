<script lang="ts">
	import Pagination from '$lib/components/pagination.svelte';
	import usePagination from '$lib/hooks/usePagination';
	import ItemService from '$lib/services/item';
	import { onMount } from 'svelte';
	import type Item from '$lib/interfaces/Item';
	import type { TableProp } from '$lib/interfaces/TableProp';
	import Table from '$lib/components/table.svelte';
	import Loader from '$lib/components/loader.svelte';
	import ActionBar from '$lib/components/actionBar.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	const itemService = new ItemService();
	const [items, isItemsLoading, , itemsCurrentPage, itemsLastPage, loadItems] = usePagination<Item>(
		itemService.getItems
	);
	const tableProp: TableProp<Item> = {
		rows: [
			{
				key: 'name',
				rowName: 'name'
			},
			{
				key: 'price',
				rowName: 'price'
			},
			{
				key: 'quantity',
				rowName: 'quantity'
			},
			{
				key: (data: Item) => data.unit?.fullName as string,
				rowName: 'unit'
			}
		],
		actions: [
			{
				icon: 'material-symbols:edit',
				onClick: (item) => goto(`/app/items/edit/${item.id}`)
			},
			{
				icon: 'material-symbols:delete',
				onClick: async (item: Item) => {
					if (item.id) {
						await itemService.deleteItem(item.id);
						loadItems();
					}
				}
			}
		]
	};

	onMount(() => {
		loadItems();
	});
</script>

<div class="flex sticky top-0 items-center py-2 px-2 w-full flex-wrap">
	<h2 class="text-4xl font-bold mb-2 lg:mb-0">Items</h2>

	{#if $items.length}
		<div class="ml-auto">
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
<ActionBar>
	<a href="/app/items/create" class="btn btn-primary btn-sm mr-2">
		<Icon class="text-xl" icon="mdi:plus" />
		Create
	</a>
</ActionBar>
<div class="-mb-1">
	<Loader isLoading={$isItemsLoading} />
</div>
{#if $items.length}
	<Table data={$items} {tableProp} />
{/if}

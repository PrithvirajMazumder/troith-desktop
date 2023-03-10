<script lang="ts">
	import Loader from '$lib/components/loader.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import Table from '$lib/components/table.svelte';
	import usePagination from '$lib/hooks/usePagination';
	import UnitService from '$lib/services/unit';
	import Icon from '@iconify/svelte';
	import type Unit from '$lib/interfaces/Unit';
	import { onMount } from 'svelte';
	import type { TableProp } from '$lib/interfaces/TableProp';
	import ActionBar from '$lib/components/actionBar.svelte';

	const unitService = new UnitService();
	const [units, isUnitsLoading, , unitsCurrentPage, unitsLastPage, loadUnits] = usePagination<Unit>(
		unitService.getUnits
	);
	let tableData: TableProp<Unit> = {
		rows: [
			{
				rowName: 'full name',
				key: 'fullName'
			},
			{
				rowName: 'short name',
				key: 'shortName'
			},
			{
				rowName: 'updated',
				key: 'updatedAt'
			}
		],
		actions: [
			{
				icon: 'material-symbols:edit',
				onClick: (unit: Unit) => {}
			},
			{
				icon: 'material-symbols:delete',
				onClick: (unit: Unit) => {}
			}
		]
	};

	onMount(async () => {
		loadUnits(1);
	});
</script>

<div class="flex sticky top-0 items-center py-2 px-2 w-full flex-wrap">
	<h2 class="text-4xl font-bold mb-2 lg:mb-0">Units</h2>

	{#if $units.length}
		<div class="ml-auto">
			<Pagination
				on:onPageChange={({ detail }) => {
					loadUnits(detail);
				}}
				currentPage={$unitsCurrentPage}
				lastPage={$unitsLastPage}
			/>
		</div>
	{/if}
</div>
<ActionBar
	on:submit={({ detail }) => {
		loadUnits($unitsCurrentPage, detail);
	}}
	on:reset={() => {
		loadUnits($unitsCurrentPage);
	}}
/>
<div class="-mb-1">
	<Loader isLoading={$isUnitsLoading} />
</div>
{#if $units.length}
	<Table data={$units} tableProp={tableData} />
{/if}

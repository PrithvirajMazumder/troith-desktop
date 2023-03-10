<script lang="ts">
	import Loader from '$lib/components/loader.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import Table from '$lib/components/table.svelte';
	import usePagination from '$lib/hooks/usePagination';
	import type { TableProp } from '$lib/interfaces/TableProp';
	import type Unit from '$lib/interfaces/Unit';
	import UnitService from '$lib/services/unit';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const unitService = new UnitService();
	const [units, isUnitsLoading, , unitsCurrentPage, unitsLastPage, loadUnits] = usePagination<Unit>(
		unitService.getUnits
	);

	onMount(async () => {
		loadUnits();
	});

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
{#if $units.length}
	<div class="flex items-center pt-2 justify-start">
		<button class="btn btn-sm mr-2">
			<Icon class="text-xl mr-1" icon="mdi:plus" />
			Create
		</button>
		<div class="form-control">
			<div class="input-group w-full flex-1">
				<input type="text" placeholder="Search…" class="input w-full input-bordered input-sm" />
				<button class="btn btn-sm btn-square">
					<Icon class="text-xl" icon="mdi:search" />
				</button>
			</div>
		</div>
	</div>
{/if}
<div class="-mb-1">
	<Loader isLoading={$isUnitsLoading} />
</div>
{#if $units.length}
	<Table data={$units} tableProp={tableData} />
{/if}

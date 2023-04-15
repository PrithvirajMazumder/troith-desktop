<script lang="ts">
	import EditUnit from './editUnit.svelte';
	import ActionBar from '$lib/components/actionBar.svelte';
	import Loader from '$lib/components/loader.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import Table from '$lib/components/table.svelte';
	import usePagination from '$lib/hooks/usePagination';
	import type { TableProp } from '$lib/interfaces/TableProp';
	import type Unit from '$lib/interfaces/Unit';
	import UnitService from '$lib/services/unit';
	import { openModal } from '$lib/utils/modal';
	import { onMount } from 'svelte';
	import CreateUnit from './createUnit.svelte';

	export const prerender = true;
	const unitService = new UnitService();
	const [units, isUnitsLoading, , unitsCurrentPage, unitsLastPage, loadUnits] = usePagination<Unit>(
		unitService.getUnits
	);
	let createModalId = 'create-unit';
	let editModalId = 'edit-unit';
	let unitToBeEdited: Unit;
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
				onClick: (unit: Unit) => {
					unitToBeEdited = unit;
					openModal(editModalId);
				}
			},
			{
				icon: 'material-symbols:delete',
				onClick: async (unit: Unit) => {
					if (unit.id) {
						await unitService.deleteUnit(unit.id);
						loadUnits();
					}
				}
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
				lastPage={unitsLastPage}
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
	on:create={() => {
		openModal(createModalId);
	}}
/>
<div class="-mb-1">
	<Loader isLoading={$isUnitsLoading} />
</div>
{#if $units.length}
	<Table data={$units} tableProp={tableData} />
{/if}
<CreateUnit on:success={() => loadUnits($unitsCurrentPage)} modalId={createModalId} />
<EditUnit
	on:success={() => loadUnits($unitsCurrentPage)}
	modalId={editModalId}
	unit={unitToBeEdited}
/>

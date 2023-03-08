<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import type Unit from '$lib/interfaces/Unit';
	import type { TableProp } from '$lib/interfaces/TableProp';
	import Table from '$lib/components/table.svelte';

	export let data: PageData;
	let units: Unit[] = data.units as Unit[];

	let tableData: TableProp<Unit> = {
		data: units,
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
		]
	};
</script>

<div class="flex items-center pb-4 px-2 w-full">
	<h2 class="text-4xl font-bold">Units</h2>
	<button class="btn btn-primary ml-auto">
		<Icon class="text-xl mr-1" icon="material-symbols:add-box-outline" />
		Create
	</button>
</div>
<Table tableProp={tableData} />

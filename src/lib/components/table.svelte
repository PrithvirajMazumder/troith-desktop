<script lang="ts">
	import type { TableProp } from '$lib/interfaces/TableProp';
	export let tableProp: TableProp<any>;
</script>

<div class="overflow-x-auto">
	<table class="table table-zebra w-full">
		<!-- head -->
		<thead>
			<tr>
				<th />
				{#each tableProp.rows as row}
					<th>{row.rowName}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each tableProp.data as tableData, index}
				<tr>
					<th style="z-index: 0;">{index + 1}</th>
					{#each tableProp.rows as row}
						<th>{tableData[row.key]}</th>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

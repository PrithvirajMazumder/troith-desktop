<script lang="ts">
	import type { TableProp } from '$lib/interfaces/TableProp';
	import Icon from '@iconify/svelte';

	export let tableProp: TableProp<any>;
	export let data: any[];
</script>

<div class="overflow-x-auto">
	<table class="table table-zebra w-full">
		<thead>
			<tr>
				{#each tableProp.rows as row}
					<th>{row.rowName}</th>
				{/each}
				{#if tableProp.actions}
					<th>Actions</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each data as tableData}
				<tr>
					{#each tableProp.rows as row, index}
						<th class:z-0={index === 0}>{tableData[row.key]}</th>
					{/each}

					{#if tableProp.actions}
						<th>
							{#each tableProp.actions as action}
								<button
									on:click|preventDefault={() => {
										action.onClick(tableData);
									}}
									class="btn btn-ghost btn-circle"
								>
									<Icon class="text-xl" icon={action.icon} />
								</button>
							{/each}
						</th>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

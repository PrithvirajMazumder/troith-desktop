<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let searchKey: string = '';
</script>

<div class="flex items-center pt-2 justify-start">
	<button
		on:click|preventDefault={() => {
			dispatch('create');
		}}
		class="btn btn-sm mr-2"
	>
		<Icon class="text-xl mr-1" icon="mdi:plus" />
		Create
	</button>
	<form
		class="form-control"
		on:submit|preventDefault={(event) => {
			searchKey = event.target.search.value;
			dispatch('submit', searchKey);
		}}
		on:reset={() => {
			if (searchKey.length) {
				searchKey = '';
				dispatch('reset');
			}
		}}
	>
		<div class="input-group w-full flex-1">
			<input
				name="search"
				type="text"
				placeholder="Search…"
				class="input w-full input-bordered input-sm"
			/>
			<button type="submit" class="btn btn-sm btn-square">
				<Icon class="text-xl" icon="mdi:search" />
			</button>
			{#if searchKey.length}
				<button type="reset" class="btn btn-sm btn-square">
					<Icon icon="mdi:clear" />
				</button>
			{/if}
		</div>
	</form>
</div>

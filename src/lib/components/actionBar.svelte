<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let searchKey: string = '';
</script>

<div class="flex items-center pt-2 justify-start">
	<div class="mr-2">
		<slot>
			<button
				on:click|preventDefault={() => {
					dispatch('create');
				}}
				class="btn btn-primary btn-sm mr-2"
			>
				<Icon class="text-xl" icon="mdi:plus" />
				Create
			</button>
		</slot>
	</div>
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
			<button type="submit" class="btn btn-sm btn-primary btn-square">
				<Icon icon="mdi:search" />
			</button>
			{#if searchKey.length}
				<button type="reset" class="btn btn-active btn-sm btn-square">
					<Icon icon="mdi:clear" />
				</button>
			{/if}
		</div>
	</form>
</div>

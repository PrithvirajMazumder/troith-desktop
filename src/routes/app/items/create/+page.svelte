<script lang="ts">
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/loader.svelte';
	import usePagination from '$lib/hooks/usePagination';
	import type Unit from '$lib/interfaces/Unit';
	import ItemService from '$lib/services/item';
	import UnitService from '$lib/services/unit';
	import AlertStore from '$lib/stores/alertStore';
	import ToastStore from '$lib/stores/toastStore';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const unitService = new UnitService();
	const itemService = new ItemService();
	let timer: NodeJS.Timeout;
	const [units, isUnitLoading, , unitsCurrentPage, unitsLastPage, loadUnits] = usePagination<Unit>(
		unitService.getUnits,
		5
	);
	let searchKey: string = '';
	let selectedUnit: Unit;
	let isCreating: boolean = false;

	const debounce = (value: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			loadUnits(1, value);
		}, 750);
	};

	onMount(() => {
		loadUnits();
	});
</script>

<div class="flex items-center gap-4 py-2 px-2 w-full flex-wrap">
	<a href="/app/items" class="btn">
		<Icon class="text-xl" icon="mdi:chevron-left" />
		back
	</a>
	<h2 class="text-4xl font-bold mb-2 lg:mb-0">Create Item</h2>
</div>

<form
	autocomplete="off"
	class="w-full lg:w-[60%]"
	on:submit={async (event) => {
		if (selectedUnit) {
			isCreating = true;
			try {
				await itemService.createItem({
					name: event.currentTarget.iteName.value,
					quantity: event.currentTarget.quantity.value,
					price: event.currentTarget.price.value,
					unitId: selectedUnit.id ?? ''
				});
				goto('/app/items', { replaceState: true });
			} catch (error) {
				AlertStore.set({ message: 'Some error occured', type: 'error' });
			} finally {
				isCreating = false;
			}

			return;
		}

		ToastStore.set([{ message: 'Select an unit', type: 'info' }]);
	}}
>
	<input autocomplete="false" name="hidden" type="text" style="display:none;" />
	<div class="flex items-center gap-4">
		<div class="form-control flex-1">
			<label for="iteName" class="label">
				<span class="label-text">Name</span>
			</label>
			<input
				required
				name="iteName"
				type="text"
				placeholder="Eg. Membrane"
				class="input w-full input-bordered"
			/>
		</div>
		<div class="form-control">
			<label for="price" class="label">
				<span class="label-text">Price</span>
			</label>
			<label class="input-group">
				<span class="bg-base-100">₹</span>
				<input
					required
					name="price"
					type="number"
					placeholder="Eg. 1000"
					class="input w-full input-bordered"
				/>
			</label>
		</div>
	</div>
	<div class="flex items-center gap-4 mt-2">
		<div class="form-control flex-1">
			<label for="quantity" class="label">
				<span class="label-text">Quantity</span>
			</label>
			<input
				required
				name="quantity"
				type="number"
				placeholder="Eg. 10"
				class="input w-full input-bordered"
			/>
		</div>
		<div class="dropdown">
			<div class="form-control flex-1">
				<label for="unit" class="label">
					<span class="label-text">Unit</span>
				</label>
				<input
					tabindex="0"
					name="unit"
					required
					type="text"
					placeholder="Select"
					class="input w-full input-bordered"
					bind:value={searchKey}
					on:keyup={() => {
						debounce(searchKey ?? '');
					}}
				/>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div tabindex="0" class="dropdown-content bg-base-100 rounded-box p-2">
				{#if $isUnitLoading}
					<Loader isLoading={true} />
				{/if}
				{#if $units.length}
					<ul class="menu w-56 rounded-box">
						{#each $units as unit}
							<li>
								<button
									type="button"
									on:click={() => {
										selectedUnit = unit;
										searchKey = selectedUnit.fullName;
									}}
								>
									{unit.fullName}
								</button>
							</li>
						{/each}
					</ul>

					<div class="flex justify-center w-full my-4">
						<div class="btn-group">
							<button
								type="button"
								class="btn btn-sm"
								on:click={() => {
									if ($unitsCurrentPage === 1) return;
									loadUnits($unitsCurrentPage - 1, searchKey);
								}}
							>
								«
							</button>
							<button type="button" class="btn btn-sm">Page {$unitsCurrentPage}</button>
							<button
								type="button"
								class="btn btn-sm"
								on:click={() => {
									if ($unitsCurrentPage === $unitsLastPage) return;
									loadUnits($unitsCurrentPage + 1, searchKey);
								}}
							>
								»
							</button>
						</div>
					</div>
				{:else}
					<div class="menu w-56 rounded-box p-4">
						<p>Nothing found</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex items-center mt-6">
		<button class="btn btn-primary" class:loading={isCreating}>
			{#if !isCreating}
				<Icon class="text-xl" icon="mdi:done" />
			{/if}
			Submit
		</button>
	</div>
</form>

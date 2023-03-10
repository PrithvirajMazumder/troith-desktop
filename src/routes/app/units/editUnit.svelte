<script lang="ts">
	import Modal from '$lib/components/modal.svelte';
	import type Unit from '$lib/interfaces/Unit';
	import UnitService from '$lib/services/unit';
	import { closeModal } from '$lib/utils/modal';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let modalId: string;
	export let unit: Unit;
	const unitService = new UnitService();
	const dispatch = createEventDispatcher();
	let isUpdating: boolean = false;
</script>

<Modal {modalId} header="Create Unit">
	<form
		on:submit={async (event) => {
			event.preventDefault();
			isUpdating = true;
			try {
				const fullName = event.target?.fullName.value;
				const shortName = event.target?.shortName.value;

				await unitService.updateUnit({ ...unit, fullName, shortName });
				closeModal(modalId);
				dispatch('success');
			} catch (error) {
				//TOOD: add toaster
			} finally {
				isUpdating = false;
			}
		}}
		id="edit-unit-form"
		slot="body"
	>
		{#if unit}
			<div class="form-control">
				<label for="fullName" class="label">
					<span class="label-text">Full Name</span>
				</label>
				<input
					id="fullName"
					name="fullName"
					type="text"
					placeholder="Eg. kilogram"
					class="input input-bordered"
					bind:value={unit.fullName}
				/>
			</div>
			<div class="form-control">
				<label for="shortName" class="label">
					<span class="label-text">Short Name</span>
				</label>
				<input
					id="shortName"
					name="shortName"
					type="text"
					placeholder="Eg. kg"
					class="input input-bordered"
					bind:value={unit.shortName}
				/>
			</div>
		{/if}
	</form>
	<button
		class="btn btn-primary"
		class:loading={isUpdating}
		type="submit"
		form="edit-unit-form"
		slot="action"
	>
		{#if !isUpdating}
			<Icon icon="mdi:done" class="text-xl" />
		{/if}
		Update
	</button>
</Modal>

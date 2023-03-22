<script lang="ts">
	import Modal from '$lib/components/modal.svelte';
	import UnitService from '$lib/services/unit';
	import { closeModal } from '$lib/utils/modal';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let modalId: string;
	const unitService = new UnitService();
	const dispatch = createEventDispatcher();
	let isCreating: boolean = false;
	let form: HTMLFormElement;
</script>

<Modal {modalId} header="Create Unit">
	<form
		bind:this={form}
		on:submit={async (event) => {
			event.preventDefault();
			isCreating = true;
			try {
				const fullName = event.currentTarget?.fullName.value;
				const shortName = event.currentTarget?.shortName.value;
				await unitService.createUnit(fullName, shortName);
				form.reset();
				closeModal(modalId);
				dispatch('success');
			} catch (error) {
				console.log('----error: ', error);
				//TOOD: add toaster
			} finally {
				isCreating = false;
			}
		}}
		id="unit-form"
		slot="body"
	>
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
			/>
		</div>
	</form>
	<button
		class="btn btn-primary"
		class:loading={isCreating}
		type="submit"
		form="unit-form"
		slot="action"
	>
		{#if !isCreating}
			<Icon icon="mdi:done" class="text-xl" />
		{/if}
		Submit
	</button>
</Modal>

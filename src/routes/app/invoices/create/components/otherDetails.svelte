<script lang="ts">
	import type { BankDetails } from '$lib/interfaces/Company';
	import { getDatetoString } from '$lib/utils/date';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	let baseTax: number = 9;
	let igst: number = baseTax * 2;
	let isOnlyIgst: boolean = false;
	let date: String = getDatetoString();
	let bankDetails: BankDetails = {
		bankName: 'Punjab National Bank',
		accountHolderName: 'Goutam Majumder',
		accountNumber: 12321321321,
		ifscCode: 'WB321321'
	};

	$: {
		if (isOnlyIgst) {
			baseTax = igst / 2;
		} else if (!isOnlyIgst) {
			igst = baseTax * 2;
		}
		console.log('date: ', date);
	}

	const dispatch = createEventDispatcher();
</script>

<div class="flex items-center mb-4">
	<h2 class=" text-3xl font-bold mb-4">Other Details</h2>
	<button class="btn btn-primary ml-auto">
		<Icon class="text-xl" icon="mdi:done" />
		Continue
	</button>
</div>
<p class="text mb-2 lg:mb-0 opacity-60">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, rerum magni facere optio
	ratione sapiente nulla reprehenderit? Ea tempora ab ut odit illo officiis sit pariatur distinctio
	repudiandae. Tempora, unde!
</p>
<div class="mt-8 flex flex-wrap gap-4">
	<div class="bg-base-200 flex-1 min-w-min flex flex-col gap-4 rounded-xl px-4 pt-4 pb-8">
		<h2 class="text-2xl">Tax details</h2>
		<div class="flex items-center gap-4">
			<div class="form-control w-full">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">SGST</span>
				</label>
				<label class="input-group w-full">
					<span class="bg-base-300">%</span>
					<input
						bind:value={baseTax}
						type="number"
						disabled={isOnlyIgst}
						placeholder="Enter"
						class="input input-bordered w-20 lg:w-full"
					/>
				</label>
			</div>
			<div class="form-control w-full">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">CGST</span>
				</label>
				<label class="input-group w-full">
					<span class="bg-base-300">%</span>
					<input
						bind:value={baseTax}
						type="number"
						disabled={isOnlyIgst}
						placeholder="Enter"
						class="input input-bordered w-20 lg:w-full"
					/>
				</label>
			</div>
		</div>
		<div class="flex items-center gap-2">
			<input
				id="isOnlyIgst"
				type="checkbox"
				bind:checked={isOnlyIgst}
				class="checkbox checkbox-primary"
			/>
			<label for="isOnlyIgst" class="label cursor-pointer">
				<span class="label-text">Only IGST required?</span>
			</label>
		</div>
		<div class="form-control w-full">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">IGST</span>
			</label>
			<label class="input-group w-full">
				<span class="bg-base-300">%</span>
				<input
					bind:value={igst}
					disabled={!isOnlyIgst}
					type="number"
					placeholder="Enter"
					class="input input-bordered w-full"
				/>
			</label>
		</div>
	</div>
	<div class="bg-base-200 flex-1 min-w-min flex flex-col gap-4 rounded-xl px-4 pt-4 pb-8">
		<h2 class="text-2xl">Misc details</h2>
		<div class="form-control w-full">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">Date</span>
			</label>
			<label class="input-group w-full">
				<span class="bg-base-300">
					<Icon class="text-xl" icon="mdi:calendar" />
				</span>
				<input
					bind:value={date}
					type="date"
					placeholder="Enter"
					class="input input-bordered w-20 lg:w-full"
				/>
			</label>
		</div>
		<div class="form-control w-full">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">Vehicle No.</span>
			</label>
			<label class="input-group w-full">
				<span class="bg-base-300">
					<Icon class="text-xl" icon="mdi:car" />
				</span>
				<input
					type="text"
					disabled={isOnlyIgst}
					placeholder="Enter a vehicle number"
					class="input input-bordered w-20 lg:w-full"
				/>
			</label>
		</div>
	</div>
	<div class="bg-base-200 flex-1 min-w-min rounded-xl p-4">
		Bank details
		<div class="form-control w-full">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">Bank Name</span>
			</label>
			<label class="input-group w-full">
				<span class="bg-base-300">
					<Icon class="text-xl" icon="mdi:building" />
				</span>
				<input
					bind:value={bankDetails.bankName}
					type="text"
					placeholder="Company's Bank Name"
					class="input input-bordered w-20 lg:w-full"
				/>
			</label>
		</div>
		<div class="form-control w-full">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">Account number</span>
			</label>
			<label class="input-group w-full">
				<span class="bg-base-300">
					<Icon class="text-xl" icon="mdi:calculator" />
				</span>
				<input
					bind:value={bankDetails.accountNumber}
					type="number"
					placeholder="Company's bank account number"
					class="input input-bordered w-20 lg:w-full"
				/>
			</label>
		</div>
		<div class="form-control w-full">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">IFSC Code</span>
			</label>
			<label class="input-group w-full">
				<span class="bg-base-300">
					<Icon class="text-xl" icon="mdi:bank" />
				</span>
				<input
					bind:value={bankDetails.ifscCode}
					type="text"
					placeholder="Company's Bank IFSC Code"
					class="input input-bordered w-20 lg:w-full"
				/>
			</label>
		</div>
	</div>
</div>

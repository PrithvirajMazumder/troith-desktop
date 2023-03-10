<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let currentPage: number;
	export let lastPage: Writable<number>;
	let pagesLimit = 5;
	let pages: number[] = [];
	const dispatch = createEventDispatcher();

	$: {
		pages = new Array($lastPage > pagesLimit ? pagesLimit : $lastPage);
		let startingPage =
			$lastPage > pagesLimit && currentPage >= pagesLimit ? currentPage - (pagesLimit - 1) : 1;
		for (let index = 0; index < pages.length; index++) {
			pages[index] = startingPage++;
		}
	}

	const updatePage = (pageNo: number) => dispatch('onPageChange', pageNo);
</script>

<div class="btn-group">
	<button
		on:click={() => {
			updatePage(1);
		}}
		class="btn btn-sm"
		disabled={currentPage === 1}
	>
		<Icon icon="mdi:chevron-double-left" />
	</button>
	<button
		on:click={() => {
			updatePage(currentPage - 1);
		}}
		class="btn btn-sm"
		disabled={currentPage === 1}
	>
		<Icon icon="mdi:chevron-left" />
	</button>
	{#each pages as page, index}
		<button
			on:click={() => {
				updatePage(page);
			}}
			class:btn-active={page === currentPage}
			class="btn btn-sm">{page}</button
		>
	{/each}
	{#if $lastPage > pagesLimit && currentPage !== $lastPage}
		<button disabled class="btn btn-sm">...</button>
	{/if}
	<button
		on:click={() => {
			updatePage(currentPage + 1);
		}}
		disabled={currentPage === $lastPage}
		class="btn btn-sm"
	>
		<Icon icon="mdi:chevron-right" />
	</button>
	<button
		on:click={() => {
			updatePage($lastPage);
		}}
		disabled={currentPage === $lastPage}
		class="btn btn-sm"
	>
		<Icon icon="mdi:chevron-double-right" />
	</button>
</div>

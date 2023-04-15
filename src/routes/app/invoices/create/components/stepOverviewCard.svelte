<script lang="ts">
	import Icon from '@iconify/svelte';
	export let completed: boolean = false;
</script>

<div
	class="indicator border-primary-content flex flex-col flex-1 border p-4"
	class:border-primary={completed}
	class:opacity-30={!completed}
>
	{#if completed}
		<span class="indicator-item indicator-start badge badge-success">
			<Icon class="text-sm" icon="mdi:done" />
		</span>
		<h2 class="text-xs text-success">Completed</h2>
	{:else}
		<h2 class="text-xs">Incompleted</h2>
	{/if}
	<slot />
</div>

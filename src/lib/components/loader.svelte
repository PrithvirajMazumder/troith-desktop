<script lang="ts">
	export let isLoading: boolean;
</script>

<progress class="progress w-full progress-primary" class:invisible={!isLoading} />

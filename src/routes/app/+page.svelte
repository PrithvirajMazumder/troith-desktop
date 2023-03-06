<script lang="ts">

	let count = 0;
</script>

<div class="flex flex-col items-center justify-center h-full">
	<h2>Welcome!!!! Nahi fata re baba</h2>
	<button
		type="submit"
		on:click={() => {
			++count;
		}}
		class="btn btn-primary">{count}</button
	>
</div>

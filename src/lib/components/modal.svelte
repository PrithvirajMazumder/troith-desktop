<script lang="ts">
	export let modalId: string;
	export let header = 'Header';
</script>

<input type="checkbox" id={modalId} class="modal-toggle" />
<label for={modalId} class="modal modal-bottom sm:modal-middle cursor-pointer">
	<label class="modal-box relative" for="">
		<label for={modalId} class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h1 class="text-lg font-bold">{header}</h1>
		<slot name="body">
			<p class="py-4">Body</p>
		</slot>
		<div class="modal-action">
			<slot name="action">
				<label for={modalId} class="btn btn-primary"> Ok </label>
			</slot>
		</div>
	</label>
</label>

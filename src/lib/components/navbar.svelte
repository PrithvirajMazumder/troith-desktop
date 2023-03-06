<script lang="ts">
	import SelectCompany from './selectCompany.svelte';
	export let userName: string;
</script>

<div class="sticky z-30 top-0 shadow-lg">
	<div class="navbar bg-base-300 border-b-base-200">
		<div class="flex w-full p-2">
			<SelectCompany />
			<div class="dropdown dropdown-end ml-auto">
				<label for="sa" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full text-center bg-success flex flex-col justify-center items-center">
						<p class="text-2xl pt-1 text-base-100">{userName[0]}</p>
					</div>
				</label>
			</div>
		</div>
	</div>
</div>

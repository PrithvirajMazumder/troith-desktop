<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="dropdown">
	<label tabindex="0" class="btn m-1 lowercase">
		<span class="uppercase">s</span> lect company
		<Icon class="text-2xl ml-2" icon="mdi:chevron-down" />
	</label>
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		<li><a href="/">Escon Engineering Co.</a></li>
		<li><a href="/">G.D Wash</a></li>
	</ul>
</div>

<script lang="ts">
	import BottomNavbar from '$lib/components/BottomNavbar/bottomNavbar.svelte';
	import Drawer from '$lib/components/Drawer/drawer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Drawer>
	<Navbar userName={data.session?.user.email ?? ''} slot="navbar" />
	<div class="p-4 relative">
		<slot />
	</div>
	<BottomNavbar />
</Drawer>

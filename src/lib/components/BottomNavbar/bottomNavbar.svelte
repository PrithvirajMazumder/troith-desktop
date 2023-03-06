<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
</script>

<div class="btm-nav lg:hidden">
	<a
		href="/app/invoices"
		class:active={$page.url.pathname === '/app/invoices'}
		class:text-primary={$page.url.pathname === '/app/invoices'}
	>
		<span class:text-primary={$page.url.pathname === '/app/invoices'}>
			<Icon class="text-2xl" icon="charm:notes-tick" />
		</span>
	</a>
	<a
		href="/app/challans"
		class:active={$page.url.pathname === '/app/challans'}
		class:text-primary={$page.url.pathname === '/app/challans'}
	>
		<span class:text-primary={$page.url.pathname === '/app/challans'}>
			<Icon class="text-2xl" icon="ri:file-paper-2-line" />
		</span>
	</a>
	<a
		href="/app"
		class:active={$page.url.pathname === '/app'}
		class:text-primary={$page.url.pathname === '/app'}
	>
		<span class:text-primary={$page.url.pathname === '/app'}>
			<Icon class="text-2xl" icon="ri:home-6-line" />
		</span>
	</a>
	<a
		href="/app/items"
		class:active={$page.url.pathname === '/app/items'}
		class:text-primary={$page.url.pathname === '/app/items'}
	>
		<span class:text-primary={$page.url.pathname === '/app/items'}>
			<Icon class="text-2xl" icon="charm:package" />
		</span>
	</a>
	<label for="main-drawer">
		<Icon class="text-3xl" icon="material-symbols:menu-rounded" />
	</label>
</div>

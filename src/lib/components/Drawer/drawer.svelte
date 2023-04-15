<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	let isCollapsed = false;
</script>

<div class="drawer drawer-mobile">
	<input id="main-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content bg-base-300">
		<slot name="navbar" />
		<slot />
	</div>
	<div class="drawer-side">
		<label for="main-drawer" class="drawer-overlay" />
		<aside class={`${isCollapsed ? '' : 'w-60'} flex flex-col bg-base-100`}>
			<div
				class={`z-20 bg-base-100 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-2 py-4 hidden lg:flex ${
					isCollapsed ? 'justify-center' : 'justify-between'
				}`}
			>
				{#if !isCollapsed}
					<a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn btn-ghost px-2">
						<div class="text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
							<span>T</span> <span class="text-base-content lowercase">roith</span>
						</div>
					</a>
				{/if}
				<button
					on:click|preventDefault={() => (isCollapsed = !isCollapsed)}
					class="btn btn-ghost bg-transparent shadow:none"
				>
					{#if !isCollapsed}
						<Icon icon="charm:chevrons-left" />
					{:else}
						<Icon icon="charm:chevrons-right" />
					{/if}
				</button>
			</div>
			<ul class="menu bg-base-100 p-2 rounded-box">
				<li>
					<a href="/app" class:active={$page.url.pathname === '/app'}>
						<Icon class="text-2xl" icon="ri:home-6-line" />
						{#if !isCollapsed}
							<span>Home</span>
						{/if}
					</a>
				</li>
			</ul>
			<ul class="menu bg-base-100 p-2 rounded-box">
				{#if !isCollapsed}
					<li class="menu-title">
						<span>Operations</span>
					</li>
				{/if}
				{#if !isCollapsed}
					<li />
				{/if}
				<li>
					<a href="/app/invoices" class:active={$page.url.pathname.includes('/app/invoices')}>
						<Icon class="text-2xl" icon="charm:notes-tick" />
						{#if !isCollapsed}
							<span>Invoice</span>
						{/if}
					</a>
				</li>
				<li>
					<a href="/app">
						<Icon class="text-2xl" icon="ri:file-paper-2-line" />
						{#if !isCollapsed}
							<span>Challan</span>
						{/if}
					</a>
				</li>
				<li>
					<a href="/app/items" class:active={$page.url.pathname.includes('/app/items')}>
						<Icon class="text-2xl" icon="charm:package" />
						{#if !isCollapsed}
							<span>Items</span>
						{/if}
					</a>
				</li>
				<li>
					<a href="/app">
						<Icon class="text-2xl" icon="charm:people" />
						{#if !isCollapsed}
							<span>Parties</span>
						{/if}
					</a>
				</li>
			</ul>
			<ul class="menu bg-base-100 p-2 rounded-box">
				{#if !isCollapsed}
					<li class="menu-title">
						<span>Misc</span>
					</li>
				{/if}
				{#if !isCollapsed}
					<li />
				{/if}
				<li>
					<a href="/app/units" class:active={$page.url.pathname === '/app/units'}>
						<Icon class="text-2xl" icon="uil:weight" />
						{#if !isCollapsed}
							<span>Units</span>
						{/if}
					</a>
				</li>
				<li>
					<a href="/app">
						<Icon class="text-2xl" icon="charm:rocket" />
						{#if !isCollapsed}
							<span>Companies</span>
						{/if}
					</a>
				</li>
			</ul>
			<ul class="menu bg-base-100 p-2 rounded-box mt-auto">
				<li>
					<a class="text-error" href="/app">
						<Icon class="text-2xl" icon="ri:logout-circle-line" />
						{#if !isCollapsed}
							<span>Logout</span>
						{/if}
					</a>
				</li>
			</ul>
		</aside>
	</div>
</div>

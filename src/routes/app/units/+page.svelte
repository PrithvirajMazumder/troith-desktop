<script lang="ts">
    import Icon from '@iconify/svelte';
    import type {PageData} from './$types';

    export let data: PageData;

    $: {
        console.log(data);
    }
</script>

<div class="flex items-center pb-4 px-2 w-full">
    <h2 class="text-4xl font-bold">Units</h2>
    <button class="btn btn-primary ml-auto">
        <Icon class="text-xl mr-1" icon="material-symbols:add-box-outline"/>
        Create
    </button>
</div>
<!-- <Table tableProp={tableData} /> -->

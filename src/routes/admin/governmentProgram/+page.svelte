<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>
    <h1>Manage Goverment Programs</h1>
    <button><a href="/admin/governmentProgram/new">Add Program</a></button>
    <ul>
        {#each data.programs as program}
            <li><a href="./{program.id}">{program.name}</a></li>
            <li>{program.description}</li>
            <a href="./governmentProgram/{program.id}/edit">Edit Program</a>
        {/each}
    </ul>

<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
</style>
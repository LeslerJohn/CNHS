<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>
    <h1>Manage Department</h1>
    <button><a href="/admin/department/new">Add Department</a></button>
    <ul>
        {#each data.departments as department}
            <li><a href="./{department.id}">{department.name}</a></li>
            <li>{department.description}</li>
            <a href="./department/{department.id}/edit">Edit Department</a>
        {/each}
    </ul>

<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
</style>
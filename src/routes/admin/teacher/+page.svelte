<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

    <h1>Manage Teacher</h1>
    <button><a href="/admin/teacher/new">Add Teacher</a></button>
    <ul>
        {#each data.teachers as teacher}
        <li>
            <a href="./teacher/{teacher.id}">{teacher.fullName}</a>
            <ul>
                <li>ID: {teacher.employeeId}</li>
                <li>position: {teacher.position}</li>
            </ul>
            <a href="./teacher/{teacher.id}/edit">Edit Teacher</a>
        </li>
    {/each}
    </ul>
<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
</style>
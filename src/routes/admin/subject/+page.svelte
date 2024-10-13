<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>
    <h1>Manage Subject</h1>
    <button><a href="/admin/subject/new">Add Subject</a></button>
    <ul>
        {#each data.subjects as subject}
            <li><a href="./{subject.id}">{subject.name}</a></li>
            <li>{subject.description}</li>
            <li>{subject.gradeLevel}</li>
            <a href="./subject/{subject.id}/edit">Edit Subject</a>
        {/each}
    </ul>

<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
</style>